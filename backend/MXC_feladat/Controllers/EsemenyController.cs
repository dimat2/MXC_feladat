using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MXC_feladat.Models.Esemeny;
using MXC_feladat.Infrastructure;
using MXC_feladat.Data;
using MXC_feladat.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace MXC_feladat.Controllers
{
    public class EsemenyController : ApiController
    {
        private readonly ApplicationDbContext data;

        public EsemenyController(ApplicationDbContext data)
        {
            this.data = data;
        }
        public ActionResult Get()
        {
            return Ok("Event works.");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DetailEsemenyResponseModel>> EventDetails(int id)
        {
            var userId = this.User.GetId();

            var userName = this.User.Identity.Name;

            var esemeny = await this.data.Esemenyek.Where(x => x.Id == id && x.UserId == userId).Select(x => new DetailEsemenyResponseModel
            {
                Id = x.Id,
                Nev = x.Nev,
                Helyszin = x.Helyszin,
                Orszag = x.Orszag,
                Kapacitas = x.Kapacitas,
                Elvegzett = x.Elvegzett,
                UserId = x.UserId

            }).FirstOrDefaultAsync();

            if (esemeny == null)
            {
                return NotFound();
            }

            var log = new Log
            {
                UserName = userName,
                Mikor = DateTime.Now,
                Esemeny = "Sikeres esemény lekérdezés (egyedi)."
            };

            this.data.Log.Add(log);

            await this.data.SaveChangesAsync();

            return esemeny;
        }

        [HttpGet]
        [Authorize(Roles = "admin, irolvas, torol")]
        public async Task<IEnumerable<DetailEsemenyResponseModel>> Events()
        {
            var userId = this.User.GetId();

            var userName = this.User.Identity.Name;

            var log = new Log
            {
                UserName = userName,
                Mikor = DateTime.Now,
                Esemeny = "Sikeres esemény lekérdezés (tömeges)."
            };

            this.data.Log.Add(log);

            await this.data.SaveChangesAsync();

            return await data.Esemenyek.Where(e => e.UserId == userId).Select(e => new DetailEsemenyResponseModel
            {
                Id = e.Id,
                Nev = e.Nev,
                Helyszin = e.Helyszin,
                Orszag = e.Orszag,
                Kapacitas = e.Kapacitas,
                Elvegzett = e.Elvegzett,

                UserId = userId,
                UserName = this.User.Identity.Name
            }).ToListAsync();
        }

        [Authorize(Roles = "admin, irolvas, torol")]
        [HttpPut]
        public async Task<ActionResult> Frissit(UpdateEsemenyRequestModel model)
        {
            var userId = this.User.GetId();

            var userName = this.User.Identity.Name;

            var esemeny = await this.data.Esemenyek.Where(x => x.Id == model.Id && x.UserId == userId).FirstOrDefaultAsync();

            if (esemeny == null)
            {
                return BadRequest();
            }

            esemeny.Nev = model.Nev;
            esemeny.Helyszin = model.Helyszin;
            esemeny.Orszag = model.Orszag;
            esemeny.Kapacitas = model.Kapacitas;
            esemeny.Elvegzett = model.Elvegzett;

            var log = new Log
            {
                UserName = userName,
                Mikor = DateTime.Now,
                Esemeny = "Sikeres esemény frissítés."
            };

            this.data.Log.Add(log);

            await this.data.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "admin, torol")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var userId = this.User.GetId();

            var userName = this.User.Identity.Name;

            var esemeny = await this.data.Esemenyek.Where(x => x.Id == id && x.UserId == userId).FirstOrDefaultAsync();

            if (esemeny == null)
            {
                return BadRequest();
            }

            this.data.Esemenyek.Remove(esemeny);

            var log = new Log
            {
                UserName = userName,
                Mikor = DateTime.Now,
                Esemeny = "Sikeres esemény törlés."
            };

            this.data.Log.Add(log);

            await this.data.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "admin, irolvas, torol")]
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateEsemenyRequestModel model)
        {
            var userId = this.User.GetId();

            var userName = this.User.Identity.Name;

            var esemeny = new Esemeny
            {
                Nev = model.Nev,
                Helyszin = model.Helyszin,
                Orszag = model.Orszag,
                Kapacitas = model.Kapacitas ,
                Elvegzett = model.Elvegzett,

                UserId = userId,
            };

            this.data.Add(esemeny);

            var log = new Log
            {
                UserName = userName,
                Mikor = DateTime.Now,
                Esemeny = "Sikeres esemény létrehozás."
            };

            this.data.Log.Add(log);

            await this.data.SaveChangesAsync();

            return Created(nameof(this.Create), esemeny.Id);
        }
    }
}
