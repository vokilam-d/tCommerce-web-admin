import { Component, OnInit } from '@angular/core';


export interface INavBarItem {
  name: string;
  link: string;
  icon: string;
  isChildrenVisible?: boolean;
  isSelected?: boolean;
  isPinned?: boolean;
  subItems?: INavBarItem[];
}


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public navBarMenu: INavBarItem[] = [];


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
        name: 'Продажи',
        link: '',
        icon: 'navbar__icon ai ai-sales',
        isChildrenVisible: false,
        isSelected: false,
        subItems: [
          {
          name: 'Заказы',
          link: '/admin/order',
          icon: 'navbar__icon ai ai-sales',
          isSelected: false,
        },
          {
            name: 'Способы оплаты',
            link: '/admin/payment-method',
            icon: 'navbar__icon ai ai-sales',
            isSelected: false,
          }
          ]
      },
      {
        name: 'Каталог',
        link: '',
        icon: 'navbar__icon ai ai-catalog',
        isChildrenVisible: false,
        isSelected: false,
        subItems: [
            {
              name: 'Категории',
              link: '/admin/category',
              icon: 'navbar__icon ai ai-catalog',
              isSelected: false,
            },
            {
              name: 'Товары',
              link: '/admin/product',
              icon: 'navbar__icon ai ai-catalog',
              isSelected: false,
            },
            {
              name: 'Атрибуты товаров',
              link: '/admin/attribute',
              icon: 'navbar__icon ai ai-catalog',
              isSelected: false,
            },
            {
              name: 'Доп. услуги',
              link: '/admin/additional-service',
              icon: 'navbar__icon ai ai-catalog',
              isSelected: false,
            },
            {
              name: 'Агрегаторы',
              link: '/admin/aggregator',
              icon: 'navbar__icon ai ai-catalog',
              isSelected: false,
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
            icon: 'navbar__icon ai ai-marketing',
            isSelected: false,
          },
          {
            name: 'Отзывы о товарах',
            link: '/admin/product-review',
            icon: 'navbar__icon ai ai-marketing',
            isSelected: false,
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
            icon: 'navbar__icon ai ai-system',
            isSelected: false,
          },
          {
            name: 'Emails',
            link: '/admin/emails-test',
            icon: 'navbar__icon ai ai-system',
            isSelected: false,
          },
          {
            name: 'Валюты',
            link: '/admin/currency',
            icon: 'navbar__icon ai ai-system',
            isSelected: false,
          },
          {
            name: 'Админы',
            link: '/admin/users',
            icon: 'navbar__icon ai ai-system',
            isSelected: false,
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

  public onSubItemClickHandler(clickedMenuItem: INavBarItem, subItem: INavBarItem) {
    this.navBarMenu.find(item => {
      if (Object.is(item, subItem)) {
        item.isSelected = true;
        clickedMenuItem.isSelected = false;
      }
  });

    clickedMenuItem.isChildrenVisible = false;
  }

  public closeSubItems() {
    const itemsWithChildren = this.getItemsWithChildren();
    itemsWithChildren.forEach(item => {
      item.isChildrenVisible = false;
      item.isSelected = false;
    });
  }

  public pinSubItem(subItem: INavBarItem) {
    subItem.isPinned = true;
    this.navBarMenu.splice(1, 0, subItem);
    this.navBarMenu = [...new Set(this.navBarMenu)];

    // console.log(this.navBarMenu);
  }

  public unpinItem(item: INavBarItem, index: number) {
    item.isPinned = false;
    this.navBarMenu.splice(index, 1);
  }
}
