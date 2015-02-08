﻿using System.Web.Mvc;

namespace PoorClaresAngular.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ViewResult Index()
        {
            System.Diagnostics.Trace.TraceInformation("User has entered Poor Clares, Arundel.");

            return View();
/*
            // If the request is not from a bot => control goes to app as normal
            if (Request.QueryString["_escaped_fragment_"] == null)
            {
                return View();
            }

            // If the request contains the _escaped_fragment_, then we return an HTML Snapshot tp the bot
            try
            {
                //We´ll crawl the normal url without _escaped_fragment_
                var result = Crawl(Request.Url.AbsoluteUri.Replace("?_escaped_fragment_=", ""));
                return Content(result);
            }
            catch (Exception ex)
            {
                // If any exception occurs then you can log the exception and return the normal View()
                return View();
            }
 */
        }
    }
}