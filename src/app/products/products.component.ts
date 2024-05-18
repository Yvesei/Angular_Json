import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public keyword: string = '';
  public totalPagesArray: number[] = [];
  public totalPages: number = 0;
  public pageSize: number = 3;
  public currentPage: number = 1;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.searchProducts();
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize).subscribe({
      next: (resp: any) => {
        this.products = resp.body as Product[];
        const totalProducts: number = parseInt(resp.headers.get('X-Total-Count'), 10);
        this.totalPages = Math.ceil(totalProducts / this.pageSize);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  handleCheckedProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
      }
    });
  }

  handleDelete(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          this.products = this.products.filter(p => p.id !== product.id);
        }
      });
    }
  }

  handleGotoPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.searchProducts();
    }
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editproduct/${product.id}`);
  }
}
