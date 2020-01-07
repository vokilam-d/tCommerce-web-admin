import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributeDto } from '../../shared/dtos/attribute.dto';
import { AttributeService } from '../../shared/services/attribute.service';
import { takeUntil } from 'rxjs/operators';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';


@Component({
  selector: 'attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent extends NgUnsubscribe implements OnInit {

  attributes: AttributeDto[] = [];

  constructor(private attributeService: AttributeService,
              private route: ActivatedRoute,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.attributeService.attributes$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(attributes => {
        this.attributes = attributes;
      });
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
}
