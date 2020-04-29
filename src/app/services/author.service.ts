import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthor(authorId: string): Observable<Author> {
    const data = this.http.get<Author>(`${environment.apiAuthors}/${authorId}`).pipe(
      map(x => x)
    );
    return data;
  }

  getAuthors(): Observable<Author[]> {
    const data = this.http.get<Author[]>(`${environment.apiAuthors}`).pipe(
      map(x => x)
    );
    return data;
  }

}
