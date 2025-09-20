import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private storageKey = 'posts';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getPosts(): Post[] {
    if (isPlatformBrowser(this.platformId)) {
      const posts = localStorage.getItem(this.storageKey);
      return posts ? JSON.parse(posts) : [];
    }
    return []; // Return empty array on server
  }

  getPost(id: string): Post | undefined {
    return this.getPosts().find(post => post.id === id);
  }

  addPost(post: Post): void {
    if (isPlatformBrowser(this.platformId)) {
      const posts = this.getPosts();
      posts.push(post);
      localStorage.setItem(this.storageKey, JSON.stringify(posts));
    }
  }

  updatePost(updatedPost: Post): void {
    if (isPlatformBrowser(this.platformId)) {
      const posts = this.getPosts().map(post =>
        post.id === updatedPost.id ? updatedPost : post
      );
      localStorage.setItem(this.storageKey, JSON.stringify(posts));
    }
  }

  deletePost(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const posts = this.getPosts().filter(post => post.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(posts));
    }
  }
}
