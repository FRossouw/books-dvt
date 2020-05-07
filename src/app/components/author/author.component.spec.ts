import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorComponent } from './author.component';
import { AuthorService } from '../../services/author.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorComponent],
      imports: [HttpClientTestingModule],
      providers: [AuthorService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
