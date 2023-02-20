using Microsoft.AspNetCore.Mvc;

namespace MXC_feladat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        public ActionResult Get()
        {
            return Ok("Works.");
        }
    }
}