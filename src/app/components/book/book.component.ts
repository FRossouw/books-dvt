import { Component, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import { BookReturn } from 'src/app/models/book-return';
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
  totalBooks = 0;
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
      this.getBooks();
    }
  }

  private getBooks(): void {
    this.allBooks = new Array();
    this.bookService.getBooks().subscribe((bookX) => {
      bookX.forEach(bookFE => {
        this.allBooks.push(bookFE);
      });
    });
    this.totalBooks = this.allBooks.length;
  }

  private getBooksPageinated(): void {
    let booksAdd: Book[] = new Array();
    booksAdd = this.books;
    this.bookService.getBooksFilter(this.topBooks, this.skipBooks).subscribe((bookFilter) => {
      if (bookFilter.length < 5) {
        this.displayViewMore = false;
      }
      bookFilter.forEach((bookFFE) => {
        booksAdd.push(bookFFE);
      });
    });
    this.books = booksAdd;
  }

  private getSearchBooks(bookName: string): void {
    this.books = new Array();
    this.bookService.getBooksSearch(bookName, this.topBooks).subscribe((bookSearched) => {
      if (bookSearched.length === 0) {
        this.noBooksFound = true;
      } else {
        this.noBooksFound = false;
      }
      bookSearched.forEach(bookSFE => {
        this.books.push(bookSFE);
      });
    });
    this.displayViewMore = false;
  }

  viewMore(): void {
    if ((this.skipBooks + 5) <= this.totalBooks) {
      this.displayViewMore = false;
    } else {
      this.skipBooks += 5;
      this.getBooksPageinated();
    }
  }



}
