import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailsComponent } from './author-details.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import { Author } from 'src/app/models/author';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';

class MockService {
  getAuthors(): Observable<Author[]> {
    return {} as Observable<Author[]>;
  }
}

class MockAuth { }

class mockActivatedRoute {}

describe('AuthorDetailsComponent', () => {
  let component: AuthorDetailsComponent;
  let fixture: ComponentFixture<AuthorDetailsComponent>;
  let service: MockService;

  const mockActivatedRoute = {
    paramMap: of({ get: (id) => id = '372dc0d0-6368-4eb3-8876-8b20d07cf722' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorDetailsComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        {
          AuthService,
          useValue: MockAuth
        },
        {
          AuthorService,
          useValue: AuthorService
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
    fixture = TestBed.createComponent(AuthorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new MockService();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
