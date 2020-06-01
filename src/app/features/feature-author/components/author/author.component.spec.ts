import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AuthorComponent } from './author.component';
import { AuthorService } from '../../services/author.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Author } from 'src/app/features/feature-author/models/author';
import { of } from 'rxjs';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;
  let mockService: AuthorService;

  const mockAuthor = [{
    href: "http://localhost:4201/Authors/ca94acca-9f7f-441b-959f-7e4f357ab60a",
    id: "ca94acca-9f7f-441b-959f-7e4f357ab60a",
    first_name: "Anne",
    last_name: "Boehm",
    name: "Anne  Boehm",
    about: "With over 30 years as a technical author, Anne Boehm obviously loves computing and writing. Since she first started with Murach Books in 1981, she has displayed a gift for organizing complex material and making it easy to understand.",
    version: "AAAAAAAAEHs=",
    books: []
  } as Author];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
    mockService = TestBed.inject(AuthorService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should check that the service returns a list of Authors to the component', fakeAsync(() => {
    spyOn(mockService, 'getAuthors').and.returnValue(of(mockAuthor));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.authors).toEqual(mockAuthor);
  }));

});
