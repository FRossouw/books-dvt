import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';
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

  getBooksFilter(top: number, skip: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiBooks}/?top=${top}&skip=${skip}`);
  }

  getBooksSearch(bookName: string, top: number, skip: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiBooks}/?query=${bookName}&top=${top}&skip=${skip}`);
  }

  createBook(book: Book): Observable<BookReturn> {
    return this.http.post<BookReturn>(environment.apiBooks, book);
  }

  updateBook(book: Book): Observable<BookReturn> {
    return this.http.put<BookReturn>(`${environment.apiBooks}/${book.isbn13}`, book);
  }

  postPicture(isbn13: string, file: File) {
    return this.http.put(`${environment.apiBooks}/${isbn13}/picture`, file);
  }

}
