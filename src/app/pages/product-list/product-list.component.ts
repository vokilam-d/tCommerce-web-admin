import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseProductDto } from '../../shared/dtos/product.dto';
import { NotyService } from '../../noty/noty.service';
import { IPagination } from '../../pagination/pagination.interface';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  products: ResponseProductDto[] = [];
  itemsTotal: number = 0;
  pagesTotal: number = 1;

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private productsService: ProductService,
              private route: ActivatedRoute,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const pagination = this.paginationCmp.getValue();
    this.fetchProducts(pagination);
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  fetchProducts(pagination: IPagination) {
    this.productsService.fetchProducts(pagination)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        response => {
          this.products = response.data;
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
        },
        error => console.warn(error)
      );
  }
}
