using CountryCRUD.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CountryCRUD.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly PayPalHttpClient client;

        public PaymentController(IOptions<PayPalSettings> paypalSettings)
        {
            var settings = paypalSettings.Value;

            var environment = new SandboxEnvironment(
                settings.ClientId,
                settings.Secret
            );

            client = new PayPalHttpClient(environment);
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] PaymentModel model)
        {
            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");

            request.RequestBody(new OrderRequest
            {
                CheckoutPaymentIntent = "CAPTURE",
                PurchaseUnits = new List<PurchaseUnitRequest>
                {
                    new PurchaseUnitRequest
                    {
                        AmountWithBreakdown = new AmountWithBreakdown
                        {
                            CurrencyCode = model.Currency,
                            Value = model.Amount.ToString()
                        }
                    }
                }
            });

            var response = await client.Execute(request);
            var result = response.Result<Order>();

            return Ok(new
            {
                status = response.StatusCode,
                orderId = result.Id,
                orderStatus = result.Status,
                links = result.Links.Select(x => new
                {
                    href = x.Href,
                    rel = x.Rel,
                    method = x.Method
                })
            });
        }

        [HttpPost("capture-order/{orderId}")]
        public async Task<IActionResult> CaptureOrder(string orderId)
        {
            var request = new OrdersCaptureRequest(orderId);
            request.RequestBody(new OrderActionRequest());

            var response = await client.Execute(request);
            var result = response.Result<Order>();

            return Ok(new
            {
                status = response.StatusCode,
                orderId = result.Id,
                paymentStatus = result.Status,
                links = result.Links
            });
        }
    }
}