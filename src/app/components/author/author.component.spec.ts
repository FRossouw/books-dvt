import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorComponent } from './author.component';
import { Author } from 'src/app/models/author';
import { AuthorService } from '../../services/author.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  class mockService {
    getAuthor() {
      return [] as Author[];
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorComponent ],
      imports: [HttpClientModule],
      providers: [
        {
          AuthorService,
          useValue: mockService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
