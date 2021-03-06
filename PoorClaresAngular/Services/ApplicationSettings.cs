﻿namespace PoorClaresAngular.Services
{
    public class ApplicationSettings : IApplicationSettings
    {
        private readonly System.Collections.Specialized.NameValueCollection _props = System.Configuration.ConfigurationManager.AppSettings;

        public string SmtpUserName
        {
            get { return _props["SmtpUserName"]; }
        }

        public string SmtpPassword
        {
            get { return _props["SmtpPassword"]; }
        }

        public string SmtpClientHost
        {
            get { return _props["SmtpClientHost"]; }
        }

        public int SmtpClientPort
        {
            get { return int.Parse(_props["SmtpClientPort"]); }
        }

        public string PrayerResponseEmailSubject
        {
            get { return _props["PrayerResponseEmailSubject"]; }
        }

        public string PrayerResponseEmailFilePathHtml
        {
            get { return _props["PrayerResponseEmailFilePathHtml"]; }
        }

        public string PrayerResponseEmailFilePathText
        {
            get { return _props["PrayerResponseEmailFilePathText"]; }
        }

        public string PrayerRequestEmailSubject
        {
            get { return _props["PrayerRequestEmailSubject"]; }
        }

        public string PrayerRequestEmailAddress
        {
            get { return _props["PrayerRequestEmailAddress"]; }
        }
    }
}