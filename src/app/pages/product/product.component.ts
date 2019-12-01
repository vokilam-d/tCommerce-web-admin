import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { EPageAction } from '../../shared/enums/category-page-action.enum';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MediaDto } from '../../shared/dto/media.dto';
import { AddOrUpdateProductDto, ResponseProductDto } from '../../shared/dto/product.dto';

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

  constructor(private productsService: ProductService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.init();
  }

  goBack() {
    this.router.navigate(['admin', 'product']);
  }

  save() {
    if (this.form.invalid) {
      this.validateAllControls();
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

    this.productsService.deleteProduct(this.product.id).subscribe(
      _ => {
        this.goBack();
      },
      error => console.warn(error)
    );
  }

  private init() {
    this.isNewProduct = this.route.snapshot.data.action === EPageAction.Add;
    if (this.isNewProduct) {
      this.buildForm(this.getEmptyProduct());
    } else {
      this.getProduct();
    }
  }

  private buildForm(product: AddOrUpdateProductDto) {
    this.form = this.formBuilder.group({
      isEnabled: product.isEnabled,
      name: [product.name, Validators.required],
      slug: product.slug,
      sku: [product.sku, Validators.required],
      price: [product.price, Validators.required],
      qty: product.qty,
      categoryIds: [product.categoryIds],
      metaTags: this.formBuilder.group({
        title: product.metaTags.title,
        description: product.metaTags.description,
        keywords: product.metaTags.keywords
      }),
      medias: [product.medias],
      fullDescription: product.fullDescription,
      shortDescription: product.shortDescription
    });
  }

  private getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.fetchProduct(id).subscribe(
      product => {
        this.product = product;
        this.buildForm(this.product);
      },
      error => console.warn(error)
    )
  }

  private validateAllControls() {
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  isControlInvalid(control: AbstractControl) {
    return !control.valid && control.touched;
  }

  private addNewProduct() {
    const dto = this.form.value;
    this.productsService.addNewProduct(dto).subscribe(
      product => {
        this.router.navigate(['admin', 'product', 'edit', product.id]);
      },
      error => console.warn(error)
    );
  }

  private updateProduct() {
    const dto = {
      ...this.product,
      ...this.form.value
    };

    this.productsService.updateProduct(this.product.id, dto).subscribe(
      product => {
        this.product = product;
      },
      error => console.warn(error)
    )
  }

  getMediaUploadUrl() {
    return `http://localhost:3500/api/v1/admin/products/media`;
  }

  mediaUploaded(media: MediaDto) {
    this.form.get('medias').value.push(media);
  }

  onMediaRemove(media: MediaDto) {
    const controlValue = this.form.get('medias').value as MediaDto[];
    const index = controlValue.findIndex(value => value.variantsUrls.original === media.variantsUrls.original);
    if (index !== -1) {
      controlValue.splice(index, 1);
    }
  }

  private getEmptyProduct(): AddOrUpdateProductDto {
    return {
      name: '',
      qty: 0,
      price: 0,
      categoryIds: [],
      fullDescription: '',
      isEnabled: true,
      medias: [],
      metaTags: {
        title: '',
        description: '',
        keywords: '',
      },
      shortDescription: '',
      sku: '',
      slug: ''
    };
  }
}
