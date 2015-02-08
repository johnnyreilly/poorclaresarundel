using System.ComponentModel.DataAnnotations;

namespace PoorClaresAngular.Models
{
    public class PrayerRequestResponse
    {
        public bool Success { get; set; }
        public string Text { get; set; }
    }
}