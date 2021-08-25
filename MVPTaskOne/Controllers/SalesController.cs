using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVPTaskOne.Models;

namespace MVPTaskOne.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly MVPTask1Context _context;

        public SalesController(MVPTask1Context context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSales()
        {
            var myContext = _context.Sales.Include(s => s.Product)
                .Include(s => s.Customer)
                .Include(s => s.Store);
            return await myContext.ToListAsync();
        }

        // GET: api/Sales
        [HttpGet("{mycount}")]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesPage(int mycount)
        {
            var myContext = _context.Sales.Include(s => s.Product)
                .Include(s => s.Customer)
                .Include(s => s.Store)
                .Take(mycount);
            return await myContext.ToListAsync();
        }

        // GET: api/Sales
        [HttpGet("{count}")]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesProductIdSort(int count)
        {
            var myContext = _context.Sales.OrderBy(e => e.Product.Name)
                .Include(s => s.Product)
                .Include(s => s.Customer)
                .Include(s => s.Store)
                .Take(count);
            return await myContext.ToListAsync();
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesProductIdSort()
        {
            var myContext = _context.Sales.OrderBy(e => e.Product.Name)
                .Include(s => s.Product)
                .Include(s => s.Customer)
                .Include(s => s.Store);
            return await myContext.ToListAsync();
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sales>>> GetSalesCustomerIdSort()
        {
            var myContext = _context.Sales.OrderBy(e => e.Customer.Name)
                .Include(s => s.Product)
                .Include(s => s.Customer)
                .Include(s => s.Store);
            return await myContext.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, Sales sales)
        {
            if (id != sales.Id)
            {
                return BadRequest();
            }

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sales
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
