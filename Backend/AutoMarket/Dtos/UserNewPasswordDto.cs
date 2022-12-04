namespace AutoMarket.Dtos
{
    public class UserNewPasswordDto
    {
        public string EmailAddress { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string OldPassword { get; set; } = string.Empty;
    }
}
