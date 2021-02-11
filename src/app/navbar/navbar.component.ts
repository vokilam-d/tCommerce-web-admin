import { Component, OnInit } from '@angular/core';


export interface INavBarItem {
  name: string;
  link: string;
  icon: string;
  action?: any;
  groupName?: string;
  subItems?: INavBarItem[];
}

export enum MenuGroup {
  Sales = 'sales',
  Catalog = 'catalog',
  Marketing = 'marketing',
  System = 'system'
}


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public navBarMenu: INavBarItem[];
  public menuGroup: typeof MenuGroup = MenuGroup;

  public isSalesGroupVisible: boolean = false;

  constructor() { }

  ngOnInit() {
    this.setMenu();
  }

  private setMenu() {
    this.navBarMenu = [
      {
        name: 'Dashboard',
        link: '/admin/dashboard',
        icon: 'navbar__icon ai ai-dashboard',
        action: this.doNothing
      },
      {
        name: 'Заказы',
        link: '',
        icon: 'navbar__icon ai ai-sales',
        action: this.toggleIsSalesGroupVisible,
        groupName: MenuGroup.Sales,
        subItems: [
          {
          name: 'Заказы',
          link: '/admin/order',
          icon: 'navbar__icon ai ai-sales'
        },
          {
            name: 'Способы оплаты',
            link: '/admin/payment-method',
            icon: 'navbar__icon ai ai-sales'
          }
          ]
      },
      {
        name: 'Товары',
        link: '',
        icon: 'navbar__icon ai ai-catalog',
        action: this.doNothing,
        subItems: [
            {
              name: 'Категории',
              link: '/admin/category',
              icon: 'navbar__icon ai ai-catalog'
            },
            {
              name: 'Товары',
              link: '/admin/product',
              icon: 'navbar__icon ai ai-catalog'
            },
            {
              name: 'Атрибуты товаров',
              link: '/admin/attribute',
              icon: 'navbar__icon ai ai-catalog'
            },
            {
              name: 'Доп. услуги',
              link: '/admin/additional-service',
              icon: 'navbar__icon ai ai-catalog'
            },
            {
              name: 'Агрегаторы',
              link: '/admin/aggregator',
              icon: 'navbar__icon ai ai-catalog'
            },
          ]
      },
      {
        name: 'Блог посты',
        link: '/admin/blog-post',
        icon: 'navbar__icon ai ai-content',
        action: this.doNothing
      },
      {
        name: 'Клиенты',
        link: '/admin/customer',
        icon: 'navbar__icon ai ai-customers',
        action: this.doNothing
      },
      {
        name: 'Отзывы',
        link: '',
        icon: 'navbar__icon ai ai-marketing',
        action: this.doNothing,
        subItems: [
          {
            name: 'Отзывы о магазине',
            link: '/admin/store-review',
            icon: 'navbar__icon ai ai-marketing'
          },
          {
            name: 'Отзывы о товарах',
            link: '/admin/product-review',
            icon: 'navbar__icon ai ai-marketing'
          }
        ]
      },
      {
        name: 'Система',
        link: '',
        icon: 'navbar__icon ai ai-system',
        action: this.doNothing,
        subItems: [
          {
            name: 'Объявление',
            link: '/admin/announcement',
            icon: 'navbar__icon ai ai-system'
          },
          {
            name: 'Emails',
            link: '/admin/emails-test',
            icon: 'navbar__icon ai ai-system'
          },
          {
            name: 'Валюты',
            link: '/admin/currency',
            icon: 'navbar__icon ai ai-system'
          },
          {
            name: 'Админы',
            link: '/admin/users',
            icon: 'navbar__icon ai ai-system'
          }
        ]
      }
    ];
  }

  public toggleIsSalesGroupVisible() {
    console.log(this.isSalesGroupVisible);
    this.isSalesGroupVisible = !this.isSalesGroupVisible;
  }

  public doNothing() { return; }
}
