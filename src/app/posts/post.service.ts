import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {environment} from "../../environments/environment";

const BACKEND_URL = environment.ApiUlr + "/posts";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{post: Post[], postCount: number}>();

constructor(public http: HttpClient, 
            public router: Router,
            public activeRouter: ActivatedRoute) { }


  getPosts(pagesize: number, pageNum) {
    const queryParams = `?pagesize=${pagesize}&page=${pageNum}`
    this.http
      .get<{ message: string; posts: any, maxPosts: number }>( BACKEND_URL+ queryParams)
      .pipe(
        map(postData => {
          return { post :postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
              creator: post.creator
            };
          }),
          maxPost: postData.maxPosts
        }
        })
      )
      .subscribe(transformedPostsData => {
        this.posts = transformedPostsData.post;
        this.postsUpdated.next({post: [...this.posts], postCount: transformedPostsData.maxPost});
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put(BACKEND_URL +"/"+ id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  getPost(postId) {
    return this.http.get<{ 
      _id: string, 
      title: string, 
      content: string, 
      imagePath: string,
      creator: string }>(BACKEND_URL  +"/"+ postId);
   
  }

  getPostUpdated() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(BACKEND_URL,postData)
      .subscribe(responseData => {
       
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId) {
   return this.http.delete(BACKEND_URL +"/"+ postId);
    
  }

}
