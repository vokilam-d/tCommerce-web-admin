import { Component, OnInit } from '@angular/core';


export interface INavBarItem {
  name: string;
  link: string;
  icon: string;
  isChildrenVisible?: boolean;
  isSelected?: boolean;
  subItems?: INavBarItem[];
}


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public navBarMenu: INavBarItem[];


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
        isSelected: true
      },
      {
        name: 'Заказы',
        link: '',
        icon: 'navbar__icon ai ai-sales',
        isChildrenVisible: false,
        isSelected: false,
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
        isChildrenVisible: false,
        isSelected: false,
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
        isSelected: false,
      },
      {
        name: 'Клиенты',
        link: '/admin/customer',
        icon: 'navbar__icon ai ai-customers',
        isSelected: false,
      },
      {
        name: 'Отзывы',
        link: '',
        icon: 'navbar__icon ai ai-marketing',
        isChildrenVisible: false,
        isSelected: false,
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
        isChildrenVisible: false,
        isSelected: false,
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

  private getItemsWithChildren(): INavBarItem[] {
    return this.navBarMenu.filter(item => {
      if (item.hasOwnProperty('isChildrenVisible')) {
        return item;
      }
    });
  }

  private toggleActiveLinkClass(clickedItem: INavBarItem) {
    this.navBarMenu.find(item => {
      if (Object.is(item, clickedItem)) {
        item.isSelected = !item.isSelected;
      } else {
        item.isSelected = false;
      }
    });
  }

  public showSubItems(clickedItem: INavBarItem) {
    const itemsWithChildren = this.getItemsWithChildren();
    itemsWithChildren.find(item => {
      if (Object.is(item, clickedItem)) {
        item.isChildrenVisible = !item.isChildrenVisible;
      } else {
        item.isChildrenVisible = false;
      }
    });

    this.toggleActiveLinkClass(clickedItem);
  }

  public onSubItemClickHandler(clickedItem: INavBarItem) {
    clickedItem.isSelected = true;
    clickedItem.isChildrenVisible = false;
  }

  public closeSubItems() {
    const itemsWithChildren = this.getItemsWithChildren();
    itemsWithChildren.forEach(item => {
      item.isChildrenVisible = false;
      item.isSelected = false;
    });
  }

  public pinMenuItem(i) {
  }
}
