import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'


describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });

    httpTestingController = TestBed.get(HttpTestingController); 
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBooks', () => {
    it('should retrieve an array of books', () => {
      service.getBooks().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Books');
      req.flush({});
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();

    });

  });

});
