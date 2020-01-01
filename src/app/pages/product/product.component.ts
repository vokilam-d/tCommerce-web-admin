import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { EPageAction } from '../../shared/enums/category-page-action.enum';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MediaDto } from '../../shared/dtos/media.dto';
import { AddOrUpdateProductDto, ResponseProductDto } from '../../shared/dtos/product.dto';
import { NotyService } from '../../noty/noty.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isNewProduct: boolean;
  product: ResponseProductDto;
  form: FormGroup;
  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '5rem',
    outline: false
  };

  get variantsFormArray(): FormArray {
    return this.form.get('variants') as FormArray;
  }

  get isMultiVariant(): boolean {
    return this.variantsFormArray.controls.length > 1
  }

  constructor(private productsService: ProductService,
              private formBuilder: FormBuilder,
              private router: Router,
              private notyService: NotyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.isNewProduct = this.route.snapshot.data.action === EPageAction.Add;
    if (this.isNewProduct) {
      this.product = this.getEmptyProduct();
      this.buildForm();
    } else {
      this.fetchProduct();
    }
  }

  save() {
    if (this.form.invalid) {
      this.validateControls();
      return;
    }

    if (this.isNewProduct) {
      this.addNewProduct();
    } else {
      this.updateProduct();
    }
  }

  delete() {
    if (!confirm(`Вы действительно хотите удалить этот товар?`)) {
      return;
    }

    this.productsService.deleteProduct(this.product.id)
      .pipe(this.notyService.attachNoty({ successText: 'Товар успешно удалён' }))
      .subscribe(
        _ => {
          this.goBack();
        },
        error => console.warn(error)
      );
  }

  private buildForm() {
    const variantsFormArray = this.formBuilder.array([]);

    this.product.variants.forEach(variant => {
      const group = this.formBuilder.group({
        id: [variant.id],
        name: [variant.name, Validators.required],
        sku: [variant.sku, Validators.required],
        slug: variant.slug,
        attributes: [variant.attributes],
        isEnabled: variant.isEnabled,
        price: [variant.price, Validators.required],
        medias: [variant.medias],
        fullDescription: variant.fullDescription,
        shortDescription: variant.shortDescription,
        metaTags: this.formBuilder.group({
          title: variant.metaTags.title,
          description: variant.metaTags.description,
          keywords: variant.metaTags.keywords
        }),
        qty: variant.qty
      });

      variantsFormArray.push(group);
    });

    this.form = this.formBuilder.group({
      isEnabled: this.product.isEnabled,
      name: [this.product.name, Validators.required],
      categoryIds: [this.product.categoryIds],
      attributes: [this.product.attributes],
      variants: variantsFormArray
    });
  }

  private fetchProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.fetchProduct(id)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        product => {
          this.product = product;
          this.buildForm();
        },
        error => console.warn(error)
      );
  }

  private validateControls(form: FormGroup | FormArray = this.form) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateControls(control);
      }
    });
  }

  isControlInvalid(control: AbstractControl) {
    return !control.valid && control.touched;
  }

  private addNewProduct() {
    const dto = { ...this.product, ...this.form.value };

    this.productsService.addNewProduct(dto)
      .pipe(this.notyService.attachNoty({ successText: 'Товар успешно добавлен' }))
      .subscribe(
        product => {
          this.router.navigate(['admin', 'product', 'edit', product.id]);
        },
        error => console.warn(error)
      );
  }

  private updateProduct() {
    const dto = { ...this.product, ...this.form.value };

    this.productsService.updateProduct(this.product.id, dto)
      .pipe(this.notyService.attachNoty({ successText: 'Товар успешно обновлён' }))
      .subscribe(
        product => {
          this.product = product;
        },
        error => console.warn(error)
      );
  }

  getMediaUploadUrl() {
    return `http://localhost:3500/api/v1/admin/products/media`;
  }

  mediaUploaded(media: MediaDto, mediasControl: AbstractControl) {
    mediasControl.value.push(media);
  }

  onMediaRemove(media: MediaDto) {
    const controlValue = this.form.get('medias').value as MediaDto[];
    const index = controlValue.findIndex(value => value.variantsUrls.original === media.variantsUrls.original);
    if (index !== -1) {
      controlValue.splice(index, 1);
    }
  }

  private getEmptyProduct(): ResponseProductDto {
    return new ResponseProductDto();
  }

  editAttributes() {
    console.log('edit attributes!');
  }

  goBack() {
    this.router.navigate(['admin', 'product']);
  }
}
