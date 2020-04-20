import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css',]
})
export class PostListComponent implements OnInit, OnDestroy{
    posts:Post[] = [];
    loading = false;
    userIsAuthenticated = false;
    userId: string;
    userName: string;
    private authStatusSub : Subscription
    posSub: Subscription ;
    totalPosts = 0;
    postPerPage = 5 ;
    currentPage = 1 ;
    pageSizeOption = [1,2,3 ,5, 10, 25, 100] ;
    constructor(public postService: PostService, 
                public authService: AuthService) {}
    
    ngOnInit() {
        this.loading = true;
        this.postService.getPosts(this.postPerPage, this.currentPage);
        this.userId = this.authService.getUserId();
        this.userName = this.authService.getUserName();
        this.posSub = this.postService.getPostUpdated()
        .subscribe(( postData: {post : Post[], postCount: number })=> {
            this.loading = false;
            this.totalPosts = postData.postCount;
            this.posts = postData.post;
            
        });
        
        //show buttons of Edit and delete after auth    
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub =  this.authService.getAuthStatusListner()
        .subscribe(authStatus => {
            this.userIsAuthenticated = authStatus;
            this.userId = this.authService.getUserId();
        });   
    }
    
    onchangedPage(pageData: PageEvent) {
        this.loading = true;
        this.currentPage = pageData.pageIndex+1;
        this.postPerPage = pageData.pageSize;
        this.postService.getPosts(this.postPerPage, this.currentPage);
    }
    deletePost(postId) {
        this.loading = true;
        this.postService.deletePost(postId)
        .subscribe( () => {
            this.postService.getPosts(this.postPerPage, this.currentPage)
        }, () => {
        this.loading = false;

        });
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe(); 
        this.posSub.unsubscribe();    
    }
}