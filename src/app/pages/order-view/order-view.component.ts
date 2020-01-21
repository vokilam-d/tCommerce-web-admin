import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDto } from '../../shared/dtos/order.dto';

@Component({
  selector: 'order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {
  order: OrderDto;

  constructor(private orderService: OrderService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    const id  = this.route.snapshot.paramMap.get('id');
    this.orderService.fetchOrder(id)
      .subscribe(
        response => {
          this.order = response.data;
        }
      );
  }
}
