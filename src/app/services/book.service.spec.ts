import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Book } from '../models/book';
import { BookReturn } from '../models/book-return';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('call method', () => {
    it('getBook() with HTTP method GET', () => {

      const mockBook = {} as Book;

      service.getBook('9780133966152').subscribe(auth => {
        expect(auth).toEqual(mockBook);
      });

      const req = httpTestingController.expectOne('http://localhost:4201/Books/9780133966152');
      expect(req.request.method).toBe('GET');
      req.flush(mockBook);

    });

    it('getBooks() with HTTP method GET', () => {

      const mockBooks = {} as Book[];

      service.getBooks().subscribe(auth => {
        expect(auth).toEqual(mockBooks);
      });

      const req = httpTestingController.expectOne('http://localhost:4201/Books');
      expect(req.request.method).toBe('GET');
      req.flush(mockBooks);

    });

    it('getBooksFilter() with HTTP method GET', () => {

      const mockBooks = {} as Book[];
      const top = 0;
      const skip = 5;

      service.getBooksFilter(top, skip).subscribe(auth => {
        expect(auth).toEqual(mockBooks);
      });

      const req = httpTestingController.expectOne(`http://localhost:4201/Books/?top=${top}&skip=${skip}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBooks);

    });

    it('getBooksSearch() with HTTP method GET', () => {

      const mockBooks = {} as Book[];
      const top = 0;
      const bookName = 'iOS';

      service.getBooksSearch(bookName, top).subscribe(auth => {
        expect(auth).toEqual(mockBooks);
      });

      const req = httpTestingController.expectOne(`http://localhost:4201/Books/?query=${bookName}&top=${top}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockBooks);

    });

    it('createBook() with HTTP method POST', () => {

      const mockBook = new Book();

      service.createBook(mockBook).subscribe(auth => {
        expect(auth).toEqual(auth as BookReturn);
      });

      const req = httpTestingController.expectOne(`http://localhost:4201/Books`);
      expect(req.request.method).toBe('POST');
      req.flush(mockBook);

    });

    it('updateBook() with HTTP method PUT', () => {

      const mockBook = new Book();
      mockBook.isbn13 = '9780133966152';

      service.updateBook(mockBook).subscribe(auth => {
        expect(auth).toEqual(auth as BookReturn);
      });

      const req = httpTestingController.expectOne(`http://localhost:4201/Books/${mockBook.isbn13}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockBook);

    });

    it('postPicture() with HTTP method PUT', () => {

      const file = new File([], 'dummy.png', { type: 'image/png' });
      const isbn13 = '9780133966152';

      service.postPicture(isbn13, file).subscribe();

      const req = httpTestingController.expectOne(`http://localhost:4201/Books/${isbn13}/picture`);
      expect(req.request.method).toBe('PUT');
      req.flush(null);

    });

  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
