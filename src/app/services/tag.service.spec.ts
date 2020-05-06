import { TestBed } from '@angular/core/testing';
import { TagService } from './tag.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Tag } from '../models/tag';

describe('TagService', () => {
  let service: TagService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TagService]
    });

    service = TestBed.inject(TagService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Call methods', () => {
    it('getTag() with HTTP method GET', () => {

      let mockTag: Tag = {
        'id': 'Angular',
        'href': '/Tags/Angular',
        'description': 'Angular'
      }

      service.getTag('Angular').subscribe(tag => {
        expect(tag).toEqual(mockTag);
      });

      const req = httpMock.expectOne('http://localhost:4201/Tags/Angular');
      expect(req.request.method).toBe('GET');

    });

    it('getTags() with HTTP method GET', () => {

      let mockTag: Tag[] = [
        {
          'id': 'Angular',
          'href': '/Tags/Angular',
          'description': 'Angular'
        },
        {
          'id': 'iOS',
          'href': '/Tags/iOS',
          'description': 'iOS'
        }
      ];

      service.getTags().subscribe(tag => {
        expect(tag.length).toEqual(2);
      });

      const req = httpMock.expectOne('http://localhost:4201/Tags');
      expect(req.request.method).toBe('GET');

    });

  });

});
