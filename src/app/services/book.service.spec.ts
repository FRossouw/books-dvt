import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Book } from '../models/book';

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
    it('getBook() should retrieve a single book', () => {
      service.getBook('9780133966152').subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Books/9780133966152');
      req.flush({});
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

    it('getBooks() should retrieve an array of books', () => {
      service.getBooks().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Books');
      req.flush({});
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

    it('createBook() should send a new book to the server', () => {
      const book = new Book();
      service.createBook(book).subscribe();

      httpTestingController.expectOne('http://localhost:4201/Books');
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

    it('updateBook() should update a book on the server', () => {
      const book = new Book();
      book.isbn13 = 'testing value';

      service.updateBook(book).subscribe();

      httpTestingController.expectOne(`http://localhost:4201/Books/${book.isbn13}`);
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

    it('getBooksFilter() should update a book on the server', () => {
      const top = 0;
      const skip = 5;

      service.getBooksFilter(top, skip).subscribe();

      httpTestingController.expectOne(`http://localhost:4201/Books/?top=${top}&skip=${skip}`);
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

    it('getBooksSearch() should update a book on the server', () => {
      const top = 0;
      const bookName = 'iOS For Dummies';

      service.getBooksSearch(bookName, top).subscribe();

      httpTestingController.expectOne(`http://localhost:4201/Books/?query=${bookName}&top=${top}`);
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

    it('postPicture() should update a book on the server', () => {
      const isbn13 = '9871234567891';
      const file = new File([], 'dummy.png', { type: 'image/png' });

      service.postPicture(isbn13, file).subscribe();

      httpTestingController.expectOne(`http://localhost:4201/Books/${isbn13}/picture`);
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();
    });

  });

});
