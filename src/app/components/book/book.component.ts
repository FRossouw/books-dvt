import { Component, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import { BookReturn } from 'src/app/models/book-return';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[] = new Array();
  allBooks: Book[] = new Array();
  bookReturn: BookReturn;
  currentBookStart = 0;
  booksPerPage = 5;
  pagesTotal: number[];
  lastPage = 0;
  currentPage = 1;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void {
    this.allBooks = new Array();
    this.bookService.getBooks().subscribe((bookX) => {
      bookX.forEach(bookFE => {
        this.allBooks.push(bookFE);
      });
      this.paginateBooks(this.booksPerPage);
      this.determinePages();
    });
  }

  private paginateBooks(numberPerPage: number): void {
    this.books = new Array();
    if (this.currentBookStart === 0) {
      for (let index = 0; index < numberPerPage; index++) {
        this.books.push(this.allBooks[index]);
      }
    } else {
      for (let bindex = this.currentBookStart; bindex < (this.currentBookStart + numberPerPage); bindex++) {
        this.books.push(this.allBooks[bindex]);
      }
    }
  }

  private determinePages(): void {
    this.pagesTotal = new Array();
    const bookTotal = this.allBooks.length;
    let pages = bookTotal / this.booksPerPage;
    if (pages % 1 !== 0) {
      pages = Math.ceil(pages);
    }

    for (let index = 1; index <= pages; index++) {
      this.pagesTotal.push(index);
    }

    this.lastPage = pages;
  }

  movePage(number: number): void {
    this.currentPage = number;

    if (number === 1) {
      this.currentBookStart = 0;
    } else if (number === this.lastPage) {
      this.currentBookStart = (this.allBooks.length - this.booksPerPage);
    } else {
      this.currentBookStart = (this.booksPerPage * (number - 1));
    }

    this.paginateBooks(this.booksPerPage);
  }

  previous(): void {
    this.currentPage--;
    this.movePage(this.currentPage);
  }

  next(): void {
    this.currentPage++;
    this.movePage(this.currentPage);
  }

}
