import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/features/feature-book/models/book';
import { BookService } from 'src/app/features/feature-book/services/book.service';
import { AuthService } from 'src/app/features/feature-authorization/services/auth.service';

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

  }

  getBook(isbn13: string): void {
    this.book = new Book();
    this.bookService.getBook(isbn13).subscribe((bookX) => {
      this.book = bookX;
    });
  }

}
