import { TestBed, inject } from '@angular/core/testing';
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

  it('should check that an Author is retrieved with an HTTP GET method', () => {
    const mockAuthor = {} as Author;

    service.getAuthor('3888d8b0-af27-4fba-bbed-f91b11f98b27').subscribe(auth => {
      expect(auth).toEqual(mockAuthor);
    });

    const req = httpTestingController.expectOne('http://localhost:4201/Authors/3888d8b0-af27-4fba-bbed-f91b11f98b27');
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthor);

  });

  it('should check that a list of Authors is retrieved with an HTTP GET method', () => {
    const mockAuthor = {} as Author[];

    service.getAuthors().subscribe(auth => {
      expect(auth).toEqual(mockAuthor);
    });

    const req = httpTestingController.expectOne('http://localhost:4201/Authors');
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthor);

  });

  it('should create a new Author using an HTTP PUT method', () => {
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

  it('should updates an existing Author using an HTTP PUT method', () => {
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

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

});
