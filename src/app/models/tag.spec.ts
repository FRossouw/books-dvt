import { Tag } from './tag';

describe('Tag', () => {
  it('should create an instance of a Tag', () => {
    expect(new Tag()).toBeTruthy();
  });

  it('should create a Tag with data', () => {
    const tag = new Tag();
    tag.id = '1200';
    tag.href = 'www.nowhere.png';
    tag.description = 'a picture of nowhere';

    expect(tag).toBeTruthy();
  });

});
