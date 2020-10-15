import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LinkedBlogPostDto } from '../../../shared/dtos/blog-post.dto';
import { PostSelectorComponent } from '../../../post-selector/post-selector.component';

@Component({
  selector: 'linked-posts',
  templateUrl: './linked-posts.component.html',
  styleUrls: ['./linked-posts.component.scss']
})
export class LinkedPostsComponent implements OnInit {

  isLoading: boolean = false;

  @Input() linkedPosts: LinkedBlogPostDto[];
  @Output() onChange = new EventEmitter<LinkedBlogPostDto[]>();
  @ViewChild(PostSelectorComponent) selectorCmp: PostSelectorComponent;

  constructor() { }

  ngOnInit(): void {}

  addNewPost() {
    this.selectorCmp.showSelector();
  }

  onPostSelect(post: LinkedBlogPostDto) {
    this.linkedPosts.push(post);
  }

  onRemove(post: LinkedBlogPostDto) {
    const idxInLinked = this.linkedPosts.findIndex(linked => linked.id === post.id);
    this.linkedPosts.splice(idxInLinked, 1);

    this.onChange.emit(this.linkedPosts);
  }

}
