using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace PoorClaresAngular
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;

            bundles.Add(new StyleBundle("~/css/poorClaresApp")
                .Include("~/content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/jquery", "//code.jquery.com/jquery-1.11.1.min.js")
                .Include("~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(

                // 3rd party libraries
                "~/scripts/angular.js",
                "~/scripts/angular-route.js",
                "~/scripts/angular-animate.js",
                "~/scripts/angular-ui/ui-bootstrap-tpls.js"
                ));

            bundles.Add(new ScriptBundle("~/js/poorClaresApp").Include(

                // App files
                "~/js/app.js")

                .IncludeDirectory("~/js/controllers", "*.js", false)
                .IncludeDirectory("~/js/services", "*.js", false)
                );
        }
    }
}