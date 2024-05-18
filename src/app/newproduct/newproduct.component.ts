import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrl: './newproduct.component.css'
})
export class NewproductComponent implements OnInit{
  
  public productForm!:FormGroup;


 constructor(private fb:FormBuilder, private productService:ProductService) { }
  ngOnInit() {
    this.productForm = this.fb.group({
     name : this.fb.control('',[Validators.required]),
      price : this.fb.control('0',[Validators.required]),
    checked : this.fb.control(false)
    });
  }

  saveProduct() {
    let product:Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe(
      {
        next: (data: any) => {
          alert(JSON.stringify(data));
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    )
}
}
