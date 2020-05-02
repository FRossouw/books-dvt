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

  private addBook(newBook: Book): void {
    const book = new Book();
    book.isbn10 = '0133966151';
    book.isbn13 = '9780133966392';
    book.title = 'Testing';
    book.image = '';

    const author = new BookAuthor();
    author.href = 'http://localhost:4201/Authors/0f3c3a97-4a31-4d06-b5e9-5a3ce01cafd6';
    author.id = '0f3c3a97-4a31-4d06-b5e9-5a3ce01cafd6';
    author.name = 'Robin2 Patricia Williams';
    book.author = author;

    this.bookService.createBook(book).subscribe((bookA) => {
      this.bookReturn = bookA;
      console.log(this.bookReturn);
    });
  }

}
