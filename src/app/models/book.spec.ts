import { Book } from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book()).toBeTruthy();
  });

  it('should create a book with data', () => {
    const book = new Book();
    book.isbN10 = '9780310351801';
    book.isbN13 = '9780310351801';
    book.publisher = 'Zondervan';
    book.datePublished = new Date('1992');
    book.version = '1';
    expect(book).toBeTruthy();
  });

});
