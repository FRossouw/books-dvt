import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  books: Book[] = new Array();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
    console.log(this.books);
  }

  private getBooks(): void {
    this.books = new Array();
    this.bookService.getBooks().subscribe((bookX) => {
      bookX.forEach(bookFE => {
        this.books.push(bookFE);
      });
    });
  }

}
