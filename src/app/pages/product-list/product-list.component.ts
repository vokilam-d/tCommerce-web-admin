import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseProductDto } from '../../shared/dtos/product.dto';
import { NotyService } from '../../noty/noty.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: ResponseProductDto[] = [];

  constructor(private productsService: ProductService,
              private route: ActivatedRoute,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchProducts();
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  private fetchProducts() {
    this.productsService.fetchProducts()
      .pipe(this.notyService.attachNoty())
      .subscribe(
        products => {
          this.products = products;
        },
        error => console.warn(error)
      );
  }
}
