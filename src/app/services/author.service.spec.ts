import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';

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

  describe('getAuthors', () => {
    it('should retrieve a single author', () => {
      service.getAuthor('3888d8b0-af27-4fba-bbed-f91b11f98b27').subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Authors/3888d8b0-af27-4fba-bbed-f91b11f98b27');
      req.flush({});
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();

    });

    it('should retrieve an array of authors', () => {
      service.getAuthors().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Authors');
      req.flush({});
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();

    });

  });

});
