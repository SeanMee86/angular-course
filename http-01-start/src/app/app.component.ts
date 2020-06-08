import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Post} from "./post.model";
import {PostsService} from "./posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetcing = false;
  error = null;
  errorSub: Subscription;

  constructor(
    private http: HttpClient,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(
      postErrorRes => {
        this.error = postErrorRes;
      }
    )
    this.callFetch();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content)
      .subscribe(
        () => {
          this.callFetch();
        }, error => {
          this.postsService.error.next(error);
        }
      );
  }

  onFetchPosts() {
    // Send Http request
    this.callFetch();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts()
      .subscribe(
        () => {
          this.loadedPosts = [];
        }
      );
  }

  onHandleError() {
    this.error = null;
  }

   callFetch() {
     this.isFetcing = true;
     this.postsService.fetchPosts()
       .subscribe(
         (posts) => {
           this.handlePosts(posts, null);
         }, error => {
           this.handlePosts([], error);
         }
       );
   }

   handlePosts(postArray: Post[], error: Error) {
     this.loadedPosts = postArray;
     this.isFetcing = false;
     this.error = error;
   }

   ngOnDestroy(): void {
    this.errorSub.unsubscribe();
   }
}
