import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CountryService } from '../services/country';
import { Country } from '../models/countrymodel';
import { PaymentService } from '../services/payment';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country.html'
})
export class CountryComponent implements OnInit {

  countries: Country[] = [];

  country: Country = {
    id: 0,
    name: '',
    code: ''
  };

  isEdit = false;

  constructor(private service: CountryService,  private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe((res: Country[]) => {
      this.countries = res;
    });
  }

  save() {
    if (this.isEdit) {
      this.service.update(this.country.id, this.country).subscribe(() => {
        this.load();
        this.reset();
      });
    } else {
      this.service.create(this.country).subscribe(() => {
        this.load();
        this.reset();
      });
    }
  }

  edit(item: Country) {
    this.country = { ...item };
    this.isEdit = true;
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => {
      this.load();
    });
  }

  reset() {
    this.country = { id: 0, name: '', code: '' };
    this.isEdit = false;
  }
  

}