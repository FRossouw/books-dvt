import { TestBed } from '@angular/core/testing';
import { TagService } from './tag.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TagService', () => {
  let service: TagService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTags', () => {
    it('should retrieve a single of tag', () => {
      service.getTag('Apple').subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Tags/Apple');
      req.flush({});
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();

    });

    it('should retrieve an array of tags', () => {
      service.getTags().subscribe();

      const req = httpTestingController.expectOne('http://localhost:4201/Tags');
      req.flush({});
      httpTestingController.verify();
      expect(httpTestingController).toBeTruthy();

    });

  });

});
