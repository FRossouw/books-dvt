import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorComponent } from './author.component';
import { AuthorService } from '../../services/author.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Author } from 'src/app/models/author';
import { Observable } from 'rxjs';

class MockService {
  getAuthors(): Observable<Author[]> {
    return {} as Observable<Author[]>;
  }
}

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;
  let service: MockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          AuthorService,
          useValue: MockService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = new MockService();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
