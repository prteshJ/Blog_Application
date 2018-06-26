// This a by default statement
import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';

// Decorator
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// A simple class
export class HomeComponent implements OnInit, OnDestroy {

  public allBlogs = [];

  constructor(public blogHttpService: BlogHttpService) {
    console.log("Home component constructor called");
  }

  ngOnInit() {
    console.log("Home component onInit called");
    this.allBlogs = this.blogHttpService.getAllBlogs().subscribe(
      data => {
        console.log(data);
        this.allBlogs = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage)
      }
    );
  }

  ngOnDestroy() {
    console.log("Home component destroyed");
  }

}
