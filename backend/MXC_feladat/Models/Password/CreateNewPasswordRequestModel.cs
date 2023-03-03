namespace MXC_feladat.Models.Password
{
    public class CreateNewPasswordRequestModel
    {
        public string UserId { get; set; }
        public string ResetToken { get; set; }
        public string NewPassword { get; set; }
    }
}
