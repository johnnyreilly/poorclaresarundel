"use strict";

interface IPrayerRequestService {
    sendPrayerRequest: (email: string, prayFor: string) => ng.IPromise<PrayerRequestResult>;
}

interface PrayerRequestResult {
    success: boolean;
    text: string;
}

angular.module("poorClaresApp.services").factory(

    "prayerRequestService",

    ["$http",
    function ($http: ng.IHttpService): IPrayerRequestService {

        var url = "/PrayerRequest";

        function sendPrayerRequest(email: string, prayFor: string) {

            var params = { email: email, prayFor: prayFor };

            return $http.post<PrayerRequestResult>(url, params)
                .then(function (response) {
                    return {
                        success: response.data.success,
                        text: response.data.text
                    };
                });
        }

        return {
            sendPrayerRequest: sendPrayerRequest
        };
    }]);
