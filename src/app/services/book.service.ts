import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BookReturn } from '../models/book-return';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBook(isbn13: string): Observable<Book> {
    return this.http.get<Book>(`${environment.apiBooks}/${isbn13}`);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiBooks}`);
  }

  createBook(book: Book): Observable<BookReturn> {
    return this.http.post<BookReturn>(environment.apiBooks, book);
  }

}
