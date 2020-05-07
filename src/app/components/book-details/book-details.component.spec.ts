import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { Book } from 'src/app/models/book';
import { Observable, of } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

class MockService {
  getBook(): Observable<Book[]> {
    return {} as Observable<Book[]>;
  }
}

class MockAuth { }

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let httpTestingController: HttpTestingController;
  let service: MockService;

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
          BookService,
          useValue: MockService
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
    service = new MockService();

  });

  it('should create', () => {
    component.getBook = () => { };
    expect(component).toBeTruthy();
  });
});
