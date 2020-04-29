import { BookAuthor } from './book-author';

describe('BookAuthor', () => {
  it('should create an instance of a Book Author', () => {
    expect(new BookAuthor()).toBeTruthy();
  });

  it('should create a Book Author with data', () => {
    const author = new BookAuthor();
    author.href = 'www.localhost.co.za.png';
    author.id = '1700';

    expect(author).toBeTruthy();
  });

});
