namespace CountryCRUD.Models
{
    public class PaymentModel
    {
        public string OrderName { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
    }
}
