using System.ComponentModel.DataAnnotations;

namespace PoorClaresAngular.Models
{
    public class PrayerRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PrayFor { get; set; }
    }
}