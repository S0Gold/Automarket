namespace AutoMarket.Helpers
{
    public class StringHelper
    {
        public static string FirstLetterToUpper(string str)
        {
            if (str == null)
                return null;

            if(char.IsUpper(str[0]))
                return str;

            if (str.Length > 1)
                return char.ToUpper(str[0]) + str.Substring(1);

            return str.ToUpper();
        }
    }
}
