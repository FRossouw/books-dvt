import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  bookImage;
  admin: boolean;

  constructor(private activatedRoute: ActivatedRoute, public bookService: BookService, private auth: AuthService) {
    this.admin = false;
    this.admin = auth.admin;
  }

  ngOnInit(): void {
    let bookIsbn13: string;
    this.activatedRoute.paramMap.subscribe(params => {
      bookIsbn13 = params.get('id');
    });

    this.getBook(bookIsbn13);
    // this.bookService.getPicture(bookIsbn13).subscribe((imageX) => {
    //   console.log(imageX);
    //   if (imageX != null) {
    //     this.bookImage = imageX;
    //     console.log(this.bookImage);
    //   } else {
    //     this.bookImage = "../../../assets/images/slide.svg";
    //   }
      
    // });

  }

  private getBook(isbn13: string): void {
    this.book = new Book();
    this.bookService.getBook(isbn13).subscribe((bookX) => {
      this.book = bookX;
    });
  }

}
