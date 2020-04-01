import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EPageAction } from '../../../shared/enums/category-page-action.enum';
import { AddOrUpdateCategoryDto, CategoryDto } from '../../../shared/dtos/category.dto';
import { NotyService } from '../../../noty/noty.service';
import { AngularEditorConfig } from '../../../angular-editor/config';

const EMPTY_CATEGORY: AddOrUpdateCategoryDto = {
  isEnabled: true,
  slug: '',
  name: '',
  description: '',
  parentId: 0,
  metaTags: {
    title: '',
    description: '',
    keywords: ''
  }
};

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: CategoryDto;
  form: FormGroup;

  get isEnabled() { return this.form && this.form.get('isEnabled') as FormControl; }
  get name() { return this.form && this.form.get('name') as FormControl; }
  get description() { return this.form && this.form.get('description') as FormControl; }
  get slug() { return this.form && this.form.get('slug') as FormControl; }
  get metaTitle() { return this.form && this.form.get('metaTags.title') as FormControl; }
  get metaDescription() { return this.form && this.form.get('metaTags.description') as FormControl; }
  get metaKeywords() { return this.form && this.form.get('metaTags.keywords') as FormControl; }

  get isNewCategory(): boolean { return this.route.snapshot.data.action === EPageAction.Add; }

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '5rem',
    outline: false
  };

  constructor(private categoriesService: CategoriesService,
              private formBuilder: FormBuilder,
              private router: Router,
              private notyService: NotyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(_ => {
      this.init();
    });
  }

  init() {
    this.category = null;

    if (this.isNewCategory) {
      this.buildForm(EMPTY_CATEGORY);
    } else {
      this.getCategory();
    }
  }

  getCategory() {
    const id = this.route.snapshot.paramMap.get('id');

    this.categoriesService.fetchCategory(id)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        response => {
          this.category = response.data;
          this.categoriesService.setSelectedCategoryId(this.category.id);
          this.buildForm(this.category);
        },
        error => console.warn(error)
      );
  }

  save() {
    if (this.form.invalid) {
      this.validateAllControls();
      return;
    }

    if (this.isNewCategory) {
      this.addNewCategory();
    } else {
      this.updateCategory();
    }
  }

  delete() {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) {
      return;
    }

    this.categoriesService.deleteCategory(this.category.id)
      .pipe(this.notyService.attachNoty({ successText: 'Категория успешно удалена' }))
      .subscribe(
        _ => {
          this.router.navigate(['admin', 'category']);
          this.categoriesService.categoryUpdated$.next();
        },
        error => console.warn(error)
      );
  }

  private addNewCategory() {
    const parentId = this.route.snapshot.paramMap.get('parentId');

    this.categoriesService.saveCategory(this.form.value, parentId)
      .pipe(this.notyService.attachNoty({ successText: 'Категория успешно создана' }))
      .subscribe(
        response => {
          this.categoriesService.categoryUpdated$.next();
          this.router.navigate(['admin', 'category', 'edit', response.data.id]);
        },
        error => console.warn(error)
      );
  }

  private updateCategory() {
    const dto = {
      ...this.category,
      ...this.form.value
    };

    this.categoriesService.updateCategory(this.category.id, dto)
      .pipe(this.notyService.attachNoty({ successText: 'Категория успешно изменена' }))
      .subscribe(
        response => {
          this.categoriesService.categoryUpdated$.next();
          this.category = response.data;
        },
        error => console.warn(error)
      );
  }

  private buildForm(category: AddOrUpdateCategoryDto) {
    this.form = this.formBuilder.group({
      isEnabled: category.isEnabled,
      name: [category.name, Validators.required],
      description: category.description,
      slug: category.slug,
      metaTags: this.formBuilder.group({
        title: category.metaTags.title,
        description: category.metaTags.description,
        keywords: category.metaTags.keywords,
      })
    });
  }

  private validateAllControls() {
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  isControlInvalid(control: FormControl) {
    return !control.valid && control.touched;
  }
}
