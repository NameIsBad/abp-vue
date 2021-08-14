namespace YZ.PrintStore.Account
{
    public class AuthenticateResultModel
    {
        public string AccessToken { get; set; }

        public int ExpireIn { get; set; }

        public string TokenType { get; set; }
    }
}