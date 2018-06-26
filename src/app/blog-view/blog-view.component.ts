import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';

// Importing Route related code
import { ActivatedRoute, Router } from "@angular/router";
import { BlogHttpService } from '../blog-http.service';

import { ToastrService } from "ngx-toastr";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Location } from "@angular/common";

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  providers: [Location]
})
export class BlogViewComponent implements OnInit, OnDestroy {

  // Empty object
  public currentBlog;

  constructor(private _route: ActivatedRoute, private router: Router, public blogHttpService: BlogHttpService, private toastr: ToastrService, private location: Location,  private modalRef: BsModalRef, private modalService: BsModalService) {
    console.log("blog-view constructor is called");
  }

  ngOnInit() {
    console.log("blog view ngOnInit  called");
    // Getting the blog id from the route
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    // Calling the function to get the blog with this blogId out of the overall array

    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
      data => {
        console.log(data);
        this.currentBlog = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  ngOnDestroy() {
    console.log("blog view destroyed");
  }

  public deleteThisBlog(): any {
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
      data => {
        console.log(data);
        this.modalRef.hide();
        this.toastr.success('Success!', 'Blog deleted successfully', { timeOut: 1000 });
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error => {
        console.log("Some error occured");
        console.log(error.errorMessage);
        this.toastr.error('Error!', 'Some error occured');
      }
    )
  }// end delete this blog

  public goBackToPreviousPage(): any {
    this.location.back();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  decline(): void {
    this.modalRef.hide();
  }
}
