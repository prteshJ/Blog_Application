import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  constructor(private blogService: BlogHttpService, private _route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  public blogTitle: string;
  public blogBodyHtml: string;
  public blogDescription: string;
  public blogCategory: string;
  public possibleCategories = ["Comedy", "Action", "Drama", "Technology"];

  ngOnInit() {
  }

  public createBlog(): any {
    let blogData = {
      title: this.blogTitle,
      description: this.blogDescription,
      blogBody: this.blogBodyHtml,
      category: this.blogCategory
    }// end blog data

    console.log(blogData);

    this.blogService.createBlog(blogData).subscribe(
      data => {
        console.log("Blog Created");
        console.log(data);
        this.toastr.success('Success!', 'Blog created successfully', { timeOut: 1500 });
        setTimeout((() => {
          this.router.navigate(['/blog', data.data.blogId]);
        }), 1500)
      },
      error => {
        console.log("Some error occured");
        console.log(error.errorMessage);
        this.toastr.error('Error!', 'Some error occured');
      }
    )
  }// end create blog method

}
