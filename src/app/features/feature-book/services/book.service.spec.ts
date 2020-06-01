import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Book } from '../models/book';
import { BookReturn } from '../models/book-return';

class MockService {
  getBook(isbn13: string): Book {
    return {} as Book;
  }

  getBooks(operation: string, top?: number, skip?: number, bookName?: string): Book[] {
    return {} as Book[];
  }

  createBook(): BookReturn {
    return {} as BookReturn;
  }

  updateBook(): BookReturn {
    return {} as BookReturn;
  }

  postPicture() { }

}

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          BookService,
          useValue: MockService
        }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a specific book with an HTTP GET method', () => {
    const mockBook = {} as Book;

    service.getBook('9780133966152').subscribe(book => {
      expect(book).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne('http://localhost:4201/Books/9780133966152');
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);

  });

  it('should retrieve a list of specified books with an HTTP GET method', () => {
    const mockBook = {} as Book[];

    service.getBooks('all').subscribe(books => {
      expect(books).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne('http://localhost:4201/Books');
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });

  it('should retrieve a list of unspecified books with an HTTP GET method', () => {
    const mockBook = {} as Book[];

    service.getBooks('').subscribe(books => {
      expect(books).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne('http://localhost:4201/Books');
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });

  it('should retrieve a specific book as search for by a user with an HTTP GET method', () => {
    const mockBook = {} as Book[];
    const bookName = 'Alpha';

    service.getBooks('search', 5, 0, bookName).subscribe(books => {
      expect(books).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne(`http://localhost:4201/Books/?query=${bookName}&top=5&skip=0`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });

  it('should retrieve a specific amount of books with an HTTP GET method', () => {
    const mockBook = {} as Book[];

    service.getBooks('filter', 5, 0).subscribe(books => {
      expect(books).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne(`http://localhost:4201/Books/?top=5&skip=0`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);
  });

  it('should create a new book with HTTP POST method', () => {
    const mockBook = new Book();

    service.createBook(mockBook).subscribe(book => {
      expect(book).toEqual(book as BookReturn);
    });

    const req = httpTestingController.expectOne(`http://localhost:4201/Books`);
    expect(req.request.method).toBe('POST');
    req.flush(mockBook);
  });

  it('should update a book with an HTTP PUT method', () => {
    const mockBook = new Book();
    mockBook.isbn13 = '9780133966152';

    service.updateBook(mockBook).subscribe(book => {
      expect(book).toEqual(book as BookReturn);
    });

    const req = httpTestingController.expectOne(`http://localhost:4201/Books/${mockBook.isbn13}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockBook);
  });

  it('should upload a book\s image with an HTTP PUT method', () => {
    const file = new File([], 'dummy.png', { type: 'image/png' });
    const isbn13 = '9780133966152';

    service.postPicture(isbn13, file).subscribe();

    const req = httpTestingController.expectOne(`http://localhost:4201/Books/${isbn13}/picture`);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
