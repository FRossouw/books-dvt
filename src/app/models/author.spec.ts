import { Author } from './author';
import { AuthorBook } from './author-book';

describe('Author', () => {
  it('should create an instance of Author', () => {
    expect(new Author()).toBeTruthy();
  });

  it('should create an Author with data', () => {
    const book = new AuthorBook();
    book.href = 'www.localhost.co.za.png';
    book.id = '1700';
    book.isbn10 = '0897656789';
    book.isbn13 = '9780897656789';
    expect(book).toBeTruthy();

    const author = new Author();
    author.first_name = 'Richard';
    author.middle_names = 'Leonard';
    author.last_name = 'Stine';
    author.name = 'Richard Leonard Stine';
    author.about = 'Some information given';
    author.version = '0x00000000000007D4';
    author.books = [];
    author.books.push(book);
    author.books.push(book);

    expect(author).toBeTruthy();
  });
});
