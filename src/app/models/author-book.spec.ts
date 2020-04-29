import { AuthorBook } from './author-book';

describe('AuthorBook', () => {
  it('should create an instance of an Author Book', () => {
    expect(new AuthorBook()).toBeTruthy();
  });

  it('should create an Author Book with data', () => {
    const book = new AuthorBook;
    book.href = "www.localhost.co.za.png";
    book.id = "1700";
    book.isbn10 = "0897656789";
    book.isbn13 = "9780897656789";

    expect(book).toBeTruthy();
  });

});
