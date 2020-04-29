import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTag(tagName: string): Observable<Tag> {
    const data = this.http.get<Tag>(`${environment.apiTags}/${tagName}`).pipe(
      map(x => x)
    );
    return data;
  }

  getTags(): Observable<Tag[]> {
    const data = this.http.get<Tag[]>(`${environment.apiTags}`).pipe(
      map(x => x)
    );
    return data;
  }

}
