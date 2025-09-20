import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added for slice pipe
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Added CommonModule
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  newPost: Post = { id: '', title: '', body: '' };

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

  addPost(): void {
    if (this.newPost.title && this.newPost.body) {
      this.newPost.id = uuidv4();
      this.postService.addPost({ ...this.newPost });
      this.posts = this.postService.getPosts();
      this.newPost = { id: '', title: '', body: '' };
    }
  }

  deletePost(id: string): void {
    this.postService.deletePost(id);
    this.posts = this.postService.getPosts();
  }
}
