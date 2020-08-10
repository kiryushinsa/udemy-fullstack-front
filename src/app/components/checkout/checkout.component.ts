import { Component, OnInit, getPlatform } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number= 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];


  checkoutFormGroup: FormGroup;

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

 
  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService) {  }

  ngOnInit(): void {
   this.checkoutFormGroup = this.formBuilder.group({
     customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
    }),
    shippingAddress: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: [''],
    }),
    billingAddress: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: [''],
    }),
    creditCard: this.formBuilder.group({
      cardType: [''],
      nameOnCard: [''],
      cardNumber: [''],
      securityCode: [''],
      expirationMonth: [''],
      expirationYear: ['']
    }),

   });

   // populate credit card months
   const startMonth: number = new Date().getMonth() + 1;
   console.log("startMonth:" + startMonth);

   this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
     data => {
       console.log("retrieved credit card months:" + JSON.stringify(data));
       this.creditCardMonths = data;
     }
   );


   // populate credit card years
   this.luv2ShopFormService.getCreditCardYears().subscribe(
     data=>{
       console.log("retrived credit card years:" + JSON.stringify(data));
       this.creditCardYears = data;
     }
   );
   
     // populate countries
   this.luv2ShopFormService.getCountries().subscribe(
       data=> {
        console.log("Retrived countries: " + JSON.stringify(data));
        this.countries = data;
      })
  }
  

  onSubmit(){
    console.log("Nadling submit button")
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('customer').value.email);

    console.log("shipping country:" + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("shipping state:" + this.checkoutFormGroup.get('shippingAddress').value.state.name);
  }

  copyShippingAddressToBillingAddress(event){
    if (event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
                    .setValue(this.checkoutFormGroup.controls.shippingAddress.value)
                    //*bug fix
      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      
      //* bugfix for states
      this.billingAddressStates = [];
    }
  }



  handleMonthsAndYears(){
    
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    
    const currentYear: number =  new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);
      
  
    // if the current year equals the selected year, then start witn current month

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }
    
    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string){

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryName}`);
    console.log(`${formGroupName} country code: ${countryCode}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data =>{
        
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }

        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

}
