import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { Author } from '../models/author';

describe('AuthorService', () => {
  let service: AuthorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('call method', () => {
    it('getAuthor() should retrieve a single author', () => {
      service.getAuthor('3888d8b0-af27-4fba-bbed-f91b11f98b27').subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Authors/3888d8b0-af27-4fba-bbed-f91b11f98b27');
      req.flush({});
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();

    });

    it('getAuthors() should retrieve an array of authors', () => {
      service.getAuthors().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Authors');
      req.flush({});
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();

    });

    it('createAuthor() should send a new author to the server', () => {
      const author = new Author();
      author.first_name = 'Robin';
      author.middle_names = 'Peter';
      author.last_name = 'Smith';

      service.createAuthor(author).subscribe();

      httpTestingController.expectOne('http://localhost:4201/Authors');
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

    it('updateAuthor() should update an author on the server', () => {
      const author = new Author();
      author.first_name = 'John';
      author.middle_names = 'Jack';
      author.last_name = 'James';
      author.id = 'test-value';

      service.updateAuthor(author).subscribe();

      httpTestingController.expectOne(`http://localhost:4201/Authors/${author.id}`);
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

  });

});
