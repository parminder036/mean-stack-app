import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 posts :Post[]=[];
 isLoading= false;
 totalPosts = 0;
 postPerPage = 2;
 pageSizeOptions = [1,2,5,10];
 currentPage =1;
 userIsAuthenticated: boolean = false;
 userId: string;
 private postSub:Subscription;
 private authStatusSub:Subscription;


  constructor( public postService:PostService, private authService:AuthService) { }

  ngOnInit() {
    this.isLoading= true;
    this.postService.getPosts( this.postPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postSub = this.postService.getPostUpdateListener()
      .subscribe((postData: {posts:Post[], postCount:number}) =>{
                this.isLoading = false;
                this.posts= postData.posts;
                this.totalPosts = postData.postCount;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    })
  }

  onPageChanged(pageData : PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPosts( this.postPerPage, this.currentPage);
  }

  onDelete(postId:string){
    this.isLoading= true;
    this.postService.deletePost(postId).subscribe((res) => {
      console.log(res);
      this.postService.getPosts( this.postPerPage, this.currentPage);
    });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
