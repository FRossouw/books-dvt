import { Isbn13Factory } from './isbn13-factory';

describe('Isbn13Factory', () => {
  it('should create an instance', () => {
    expect(new Isbn13Factory()).toBeTruthy();
  });
});
