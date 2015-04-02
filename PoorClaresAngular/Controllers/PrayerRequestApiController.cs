using PoorClaresAngular.Implementations;
using PoorClaresAngular.Interfaces;
using PoorClaresAngular.Models;
using System;
using System.Diagnostics;
using System.Linq;
using System.Web.Http;

namespace PoorClaresAngular.Controllers
{
    public class PrayerRequestApiController : ApiController
    {
        private readonly IApplicationSettings _props;
        private readonly IMailer _mailer;

        public PrayerRequestApiController() : this(new ApplicationSettings(), new Mailer())
        {
        }

        public PrayerRequestApiController(IApplicationSettings props, IMailer mailer)
        {
            _props = props;
            _mailer = mailer;
        }

        [Route("PrayerRequest")]
        [HttpPost]
        public IHttpActionResult SendPrayerRequest(PrayerRequest prayerRequest)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(m => m.ErrorMessage);

                return Ok(new PrayerRequestResponse
                {
                    Success = false,
                    Text = "Sorry your email was not sent because: " + string.Join(", ", errors)
                });
            }

            try
            {
                // Get email content
                var text = _mailer.ReadTextFromFile(_props.PrayerResponseEmailFilePathText);
                var html = _mailer.ReadTextFromFile(_props.PrayerResponseEmailFilePathHtml);

                // Send prayer request email
                _mailer.SendMail(_props.SmtpClientHost, _props.SmtpClientPort, _props.SmtpUserName, _props.SmtpPassword,
                    fromEmail: prayerRequest.Email,
                    toEmail: _props.PrayerRequestEmailAddress,
                    subject: _props.PrayerRequestEmailSubject,
                    text: /*System.Web.Security.AntiXss.AntiXssEncoder.HtmlEncode(*/prayerRequest.PrayFor/*, true)*/); // It's text - it doesn't need anti xss

                // Send prayer response email
                _mailer.SendMail(_props.SmtpClientHost, _props.SmtpClientPort, _props.SmtpUserName, _props.SmtpPassword,
                    fromEmail: _props.PrayerRequestEmailAddress,
                    toEmail: prayerRequest.Email,
                    subject: _props.PrayerResponseEmailSubject,
                    text: text,
                    html: html);
            }
            catch (Exception ex)
            {
                Trace.TraceError("{0}\r\n\r\nStack Trace:\r\n\r\n{1}", ex.Message, ex.StackTrace);

                return Ok(new PrayerRequestResponse
                {
                    Success = false,
                    Text = "Your prayer request has not been sent - please try mailing: " + _props.PrayerRequestEmailAddress
                });
            }

            Trace.TraceInformation("Prayer request sent.");
            return Ok(new PrayerRequestResponse
            {
                Success = true,
                Text = "Thanks for sending your prayer request - we will pray."
            });
        }
    }
}