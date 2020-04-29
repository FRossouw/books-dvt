import { Book } from './book';
import { BookAuthor } from './book-author';
import { Tag } from './tag';

describe('Book', () => {
  it('should create an instance of a Book', () => {
    expect(new Book()).toBeTruthy();
  });

  it('should create a Book with data', () => {
    const author = new BookAuthor();
    author.href = 'www.localhost.co.za.png';
    author.id = '1700';
    expect(author).toBeTruthy();

    const tag = new Tag();
    tag.id = '1200';
    tag.href = 'www.nowhere.png';
    tag.description = 'a picture of nowhere';
    expect(tag).toBeTruthy();
    const book = new Book();
    book.isbn10 = '9780310351801';
    book.isbn13 = '9780310351801';
    book.title = 'The nightmare before sunshine';
    book.about = 'Some text here';
    book.abstract = 'Some text here';
    book.author = author;
    book.publisher = 'Zondervan';
    book.date_published = new Date('1992');
    book.image = 'www.something.co.za.png';
    book.tags = [];
    book.tags.push(tag);
    book.tags.push(tag);
    expect(book).toBeTruthy();
  });

});
