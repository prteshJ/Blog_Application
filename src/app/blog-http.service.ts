import { Injectable } from '@angular/core';
// importing http client to make the requests
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

// import observable related code
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators'; // catch() becomes catchError()
import { tap } from 'rxjs/operators'; // do() becomes tap()

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {
  private baseUrl = 'https://blogapp.edwisor.com/api/v1/blogs';
  private authToken = 'NGUwNTM3M2Q4YmZmMDlhYTZlMTBiY2IwZWJlN2U0ZWMxYzdiMGVhNGYyODEzYWU2YmU3YTgzMTkzNjNiNDBhMmQ4MWNiMGJkMTEzMTY0YjUyM2JjNTMzMTE5OWJkNzYwOGFlMmVmNWVkNDEyOTgyMWRhOWZiMDA4YmEzZGY0NjlkMDM2';

  constructor(private _http: HttpClient) {
    console.log("blog-http service was called");
  }

  // exception handler 
  private handleError(err: HttpErrorResponse) {
    console.log('Handle error Http calls');
    console.log(err.message);
    return Observable.throw(err.message);
  }

  // method to get a particular blog
  public getSingleBlogInformation(currentBlogId): any {
    let myResponse = this._http.get(this.baseUrl + '/view/' + currentBlogId + '?authToken=' + this.authToken);
    console.log(myResponse);
    return myResponse;
  } // end get blog information function

  // method to return all the blogs
  public getAllBlogs(): any {
    let myResponse = this._http.get(this.baseUrl + '/all?authToken=' + this.authToken);
    console.log(myResponse);
    return myResponse;
  };

  public createBlog(blogData): any {
    let myResponse = this._http.post(this.baseUrl + '/create?authToken=' + this.authToken, blogData);
    return myResponse;
  } // end create blog

  public deleteBlog(blogId): any {
    let data = {};
    let myResponse = this._http.post(this.baseUrl + '/' + blogId + '/delete?authToken=' + this.authToken, data);
    return myResponse;

  }// end delete blog

  public editBlog(blogId, blogData): any {
    let myResponse = this._http.put(this.baseUrl + '/' + blogId + '/edit?authToken=' + this.authToken, blogData);
    return myResponse;
  }// end edit blog
}
