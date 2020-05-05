import { Component, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';
import { BookReturn } from 'src/app/models/book-return';
import { BookAuthor } from 'src/app/models/book-author';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Output()
  books: Book[] = new Array();
  bookReturn: BookReturn;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // this.addBook(null);
    this.getBooks();
  }

  private getBooks(): void {
    this.books = new Array();
    this.bookService.getBooks().subscribe((bookX) => {
      bookX.forEach(bookFE => {
        this.books.push(bookFE);
        //console.log(bookFE);
      });
    });
  }

}
