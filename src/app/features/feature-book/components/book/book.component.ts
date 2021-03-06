import { Component, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/features/feature-book/services/book.service';
import { Book } from 'src/app/features/feature-book/models/book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[] = new Array();
  allBooks: Book[] = new Array();
  topBooks = 5;
  skipBooks = 0;
  displayViewMore = true;
  query: string;
  noBooksFound = false;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.query = params.get('name');
      if (this.query != null) {
        this.getSearchBooks(this.query);
      }
    });

    if (this.query == null) {
      this.getBooksPageinated();
    }
  }

  getBooksPageinated(): void {
    let booksAdd: Book[] = new Array();
    booksAdd = this.books;
    this.bookService.getBooksFilter(this.topBooks, this.skipBooks).subscribe((bookFilter) => {
      if (bookFilter.length < this.topBooks) {
        this.displayViewMore = false;
      }
      bookFilter.forEach((bookFFE) => {
        booksAdd.push(bookFFE);
      });
    });
    this.books = booksAdd;
  }

  getSearchBooks(bookName: string): void {
    const booksAdd: Book[] = new Array();
    this.bookService.getBooksSearch(bookName, this.topBooks, this.skipBooks).subscribe((bookSearched) => {
      if (bookSearched.length === 0) {
        this.noBooksFound = true;
      } else {
        this.noBooksFound = false;
      }
      bookSearched.forEach(bookSFE => {
        booksAdd.push(bookSFE);
      });
    });
    this.books = booksAdd;
    bookName = '';
    this.displayViewMore = false;
  }

  viewMore(): void {
    if (this.displayViewMore) {
      this.skipBooks += 5;
      this.getBooksPageinated();
    }
  }



}
