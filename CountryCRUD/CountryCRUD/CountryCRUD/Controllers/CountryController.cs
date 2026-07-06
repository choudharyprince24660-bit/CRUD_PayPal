using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CountryCRUD.Data;
using CountryCRUD.Models;

namespace CountryCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CountryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Country>>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Country>> GetCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);

            if (country == null)
                return NotFound();

            return country;
        }

        [HttpPost]
        public async Task<ActionResult<Country>> PostCountry(Country country)
        {
            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            return Ok(country);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCountry(int id, Country country)
        {
            var data = await _context.Countries.FindAsync(id);

            if (data == null)
                return NotFound();

            data.Name = country.Name;
            data.Code = country.Code;

            await _context.SaveChangesAsync();

            return Ok(data);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var data = await _context.Countries.FindAsync(id);

            if (data == null)
                return NotFound();

            _context.Countries.Remove(data);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}