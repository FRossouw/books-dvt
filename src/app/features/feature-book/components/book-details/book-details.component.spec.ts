import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { Book } from 'src/app/features/feature-book/models/book';
import { Observable, of } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/features/feature-authorization/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/features/feature-book/services/book.service';

class MockAuth { }

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let httpTestingController: HttpTestingController;
  let mockService: BookService;

  const mockActivatedRoute = {
    paramMap: of({ get: (id) => id = '372dc0d0-6368-4eb3-8876-8b20d07cf722' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          AuthService,
          useValue: MockAuth
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    mockService = TestBed.inject(BookService);

  });

  it('should be created', () => {
    component.getBook = () => { };
    expect(component).toBeTruthy();
  });

  it('should check that the service returns a specific Book to the component', fakeAsync(() => {
    const mockBook = {} as Book;
    spyOn(mockService, 'getBook').and.returnValue(of(mockBook));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.book).toEqual(mockBook);
  }));
});
