import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author';
import { environment } from 'src/environments/environment';
import { AuthorReturn } from '../models/author-return';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthor(authorId: string): Observable<Author> {
    return this.http.get<Author>(`${environment.apiAuthors}/${authorId}`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiAuthors}`);
  }

  createAuthor(author: Author): Observable<AuthorReturn> {
    return this.http.post<AuthorReturn>(environment.apiAuthors, author);
  }

  updateAuthor(author: Author): Observable<AuthorReturn> {
    return this.http.post<AuthorReturn>(`${environment.apiAuthors}/${author.id}`, author);
  }

}
