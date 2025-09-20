import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.post = { ...this.postService.getPost(id) } as Post;
    }
  }

  updatePost(): void {
    if (this.post && this.post.title && this.post.body) {
      this.postService.updatePost(this.post);
      this.router.navigate(['/']);
    }
  }
}
