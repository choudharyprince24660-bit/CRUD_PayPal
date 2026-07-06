import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../services/payment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html'
})
export class PaymentComponent implements OnInit {

  payment = {
    orderName: '',
    amount: 0,
    currency: 'USD'
  };

  message = '';

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.message = "Processing payment...";
        this.paymentService.captureOrder(token).subscribe({
          next: () => {
            this.message = "Payment Completed Successfully!";
          },
          error: () => {
            this.message = "Payment Failed!";
          }
        });
      }
    });
  }

  createOrder() {
    this.paymentService.createOrder(this.payment)
      .subscribe((res: any) => {
        const approveLink = res.links.find((x: any) => x.rel === 'approve');
        if (approveLink) {
          window.location.href = approveLink.href;
        }
      });
  }
}