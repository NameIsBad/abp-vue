namespace YZ.PrintStore.Models.Login
{
    public class AuthenticateResultModel
    {
        public string AccessToken { get; set; }

        public int ExpireIn { get; set; }

        public string TokenType { get; set; }
    }
}