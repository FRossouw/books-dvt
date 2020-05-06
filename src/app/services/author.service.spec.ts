import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { Author } from '../models/author';
import { AuthorReturn } from '../models/author-return';

class MockService {
  getAuthor(): Author {
    return {} as Author;
  }

  getAuthors(): Author[] {
    return {} as Author[];
  }

  createAuthor(): AuthorReturn {
    return {} as AuthorReturn;
  }

  updateAuthor(): AuthorReturn {
    return {} as AuthorReturn;
  }
}

describe('AuthorService', () => {
  let service: AuthorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          AuthorService,
          useValue: MockService
        }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('call methods', () => {
    it('getAuthor() with HTTP method GET', () => {

      const mockAuthor = {} as Author;

      service.getAuthor('3888d8b0-af27-4fba-bbed-f91b11f98b27').subscribe(auth => {
        expect(auth).toEqual(mockAuthor);
      });

      const req = httpTestingController.expectOne('http://localhost:4201/Authors/3888d8b0-af27-4fba-bbed-f91b11f98b27');
      expect(req.request.method).toBe('GET');
      req.flush(mockAuthor);

    });

    it('getAuthors() with HTTP method GET', () => {

      const mockAuthor = {} as Author[];

      service.getAuthors().subscribe(auth => {
        expect(auth).toEqual(mockAuthor);
      });

      const req = httpTestingController.expectOne('http://localhost:4201/Authors');
      expect(req.request.method).toBe('GET');
      req.flush(mockAuthor);

    });

    it('createAuthor() with HTTP method PUT', () => {

      const mockAuthor = new Author();
      mockAuthor.first_name = 'John';
      mockAuthor.last_name = 'Doe';
      mockAuthor.about = 'About me..';

      service.createAuthor(mockAuthor).subscribe(auth => {
        expect(auth).toEqual(mockAuthor);
      });

      const req = httpTestingController.expectOne('http://localhost:4201/Authors');
      expect(req.request.method).toBe('PUT');
      req.flush(mockAuthor);

    });

    it('updateAuthor() with HTTP method PUT', () => {

      const mockAuthor = new Author();
      mockAuthor.id = '3888d8b0-af27-4fba-bbed-f91b11f98b27';
      mockAuthor.first_name = 'John';
      mockAuthor.last_name = 'Doe';
      mockAuthor.about = 'About me..';

      service.updateAuthor(mockAuthor).subscribe(auth => {
        expect(auth).toEqual(mockAuthor);
      });

      const req = httpTestingController.expectOne('http://localhost:4201/Authors/3888d8b0-af27-4fba-bbed-f91b11f98b27');
      expect(req.request.method).toBe('PUT');
      req.flush(mockAuthor);

    });

  });

  // afterEach(() => {
  //   httpTestingController.verify();
  // });

});
