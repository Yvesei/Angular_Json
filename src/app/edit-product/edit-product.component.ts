import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productId! : number;
  productFormGroup! : FormGroup;
  constructor(private rout : ActivatedRoute,
    private prodictService: ProductService,
    private fb : FormBuilder) {}

  ngOnInit() {
    this.productId = this.rout.snapshot.params['id'];
    this.prodictService.getProductById(this.productId).subscribe({
      next: product => {
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id,Validators.required),
          name: this.fb.control(product.name,Validators.required),
          price:  this.fb.control(product.price,  [Validators.required, Validators.min(100)]),
          checked:  this.fb.control(product.checked,Validators.required)
        });
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
  updateProduct() {
    let product : Product = this.productFormGroup.value;
    this.prodictService.updateProduct(product).subscribe({
      next: product => {
        alert(JSON.stringify(product));
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

}
