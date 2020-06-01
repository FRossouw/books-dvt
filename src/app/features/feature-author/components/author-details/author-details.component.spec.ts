import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AuthorDetailsComponent } from './author-details.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Author } from 'src/app/features/feature-author/models/author';
import { AuthService } from 'src/app/features/feature-authorization/services/auth.service';
import { AuthorService } from 'src/app/features/feature-author/services/author.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

class MockAuth { }

describe('AuthorDetailsComponent', () => {
  let component: AuthorDetailsComponent;
  let fixture: ComponentFixture<AuthorDetailsComponent>;
  let mockService: AuthorService;
  let httpTestingController: HttpTestingController;

  const mockAuthor = {
    href: 'http://localhost:4201/Authors/ca94acca-9f7f-441b-959f-7e4f357ab60a',
    id: 'ca94acca-9f7f-441b-959f-7e4f357ab60a',
    first_name: 'Anne',
    last_name: 'Boehm',
    name: 'Anne  Boehm',
    about: 'With over 30 years as a technical author, Anne Boehm obviously loves computing and writing. Since she first started with Murach Books in 1981, she has displayed a gift for organizing complex material and making it easy to understand.',
    version: 'AAAAAAAAEHs=',
    books: []
  } as Author;

  const mockActivatedRoute = {
    paramMap: of({ get: (id) => id = '372dc0d0-6368-4eb3-8876-8b20d07cf722' })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorDetailsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          AuthService,
          useClass: MockAuth
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
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    mockService = TestBed.inject(AuthorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    component.getAuthor = () => { };
    expect(component).toBeTruthy();
  });

  it('should check that the service returns a specific Author to the component', fakeAsync(() => {
    spyOn(mockService, 'getAuthor').and.returnValue(of(mockAuthor));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.author).toEqual(mockAuthor);
  }));
});
