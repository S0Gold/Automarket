using AutoMarket.Dtos;

namespace AutoMarket.Helpers
{
    public class Recomandation
    {
        public static IEnumerable<AnnouncementViewDto> CalculateScores(IEnumerable<AnnouncementViewDto> input, PreferencesDto preferences)
        {
            Dictionary<AnnouncementViewDto, int> scores = new Dictionary<AnnouncementViewDto, int>();

            foreach (var announcement in input)
            {
                int score = 0;
                if (preferences.Brands.Contains(announcement.Brand))
                    score += 1000;
                if (preferences.Models.Contains(announcement.Model))
                    score += 250;
                if (preferences.Bodies.Contains(announcement.Body))
                    score += 500;
                if (preferences.Years.Contains(announcement.Year))
                    score += 150;
                if (preferences.Counties.Contains(announcement.County))
                    score += 150;
                scores.Add(announcement, score);
            }
            var response = (from entry in scores orderby entry.Value descending select entry.Key).ToList();
            return (response);
        }

        public static PreferencesDto SetValuesForPreferences(IEnumerable<AnnouncementViewDto> input)
        {
            var output = new PreferencesDto
            {
                Brands = new List<string>(),
                Models = new List<string>(),
                Bodies = new List<string>(),
                Years = new List<int>(),
                Counties = new List<string>()
            };
                
               
            foreach (var item in input)
            {
                output.Brands.Add(item.Brand);
                output.Models.Add(item.Model);
                output.Bodies.Add(item.Body);
                output.Years.Add(item.Year);
                output.Counties.Add(item.County);
            }

            return output;
        }
    }
}
