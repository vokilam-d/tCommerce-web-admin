import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminBlogPostDto } from '../../shared/dtos/blog-post.dto';
import { NotyService } from '../../noty/noty.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BlogPostService } from '../../shared/services/blog-post.service';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { EPageAction } from '../../shared/enums/category-page-action.enum';
import { HeadService } from '../../shared/services/head.service';
import { UPLOADED_HOST } from '../../shared/constants/constants';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent extends NgUnsubscribe implements OnInit {

  isNewBlogPost: boolean;
  post: AdminBlogPostDto;
  form: FormGroup;
  isLoading: boolean = false;

  uploadedHost = UPLOADED_HOST;

  constructor( private router: Router,
               private notyService: NotyService,
               private formBuilder: FormBuilder,
               private blogPostService: BlogPostService,
               private route: ActivatedRoute,
               private headService: HeadService
  ) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.isNewBlogPost = this.route.snapshot.data.action === EPageAction.Add;
    if (this.isNewBlogPost) {
      this.post = new AdminBlogPostDto();
      this.buildForm();
      this.headService.setTitle(`Новый пост`);
    } else {
      this.fetchPostAndBuildForm();
    }
  }

  private fetchPostAndBuildForm() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.blogPostService.fetchPost(parseInt(id))
      .pipe(this.notyService.attachNoty(), finalize(() => this.isLoading = false))
      .subscribe(
        response => {
          this.post = response.data;
          this.buildForm();
          this.headService.setTitle(this.post.name);
        },
        error => console.warn(error)
      );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: [this.post.name],
    });
  }

  private validateControls(form: FormGroup | FormArray) {
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

  private addNewBlogPost() {
    const dto = { ...this.post, ...this.form.value };

    this.blogPostService.addNewPost(dto)
      .pipe(this.notyService.attachNoty({ successText: 'Пост успешно добавлен' }))
      .subscribe(
        response => {
          this.router.navigate(['admin', 'blog-post', 'edit', response.data.id]);
        },
        error => console.warn(error)
      );
  }

  private updateBlogPost() {
    const dto = { ...this.post, ...this.form.value };

    this.blogPostService.updatePost(this.post.id, dto)
      .pipe(this.notyService.attachNoty({ successText: 'Пост успешно обновлён' }))
      .subscribe(
        response => {
          this.post = response.data;
          this.buildForm();
        },
        error => console.warn(error)
      );
  }

  goBack() {
    this.router.navigate(['admin', 'blog-post']);
  }

  delete() {
    if (!confirm(`Вы действительно хотите удалить этот пост?`)) {
      return;
    }

    this.blogPostService.deletePost(this.post.id)
      .pipe(this.notyService.attachNoty({ successText: 'Пост успешно удалён' }))
      .subscribe(
        _ => {
          this.goBack();
        },
        error => console.warn(error)
      );
  }

  save() {
    if (this.form.invalid) {
      this.notyService.showErrorNoty(`Ошибка в форме`);
      this.validateControls(this.form);
      return;
    }

    if (this.isNewBlogPost) {
      this.addNewBlogPost();
    } else {
      this.updateBlogPost();
    }
  }

}
