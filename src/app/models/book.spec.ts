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
    book.image = 'https://books.google.co.za/books/content?id=-YVDDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72ROXxmlqtPNMtU6jGp_LjIwh3htJg8w26h7-pRZuSTWwW2MetSGxgiYSZ2_mlAtdU0pSq7Ct5UDanTMiPB4Ud1qmYzT6kO-SxqDkmtG_sABYVeqL5UO8gcb0doXV4fq9rxdwh5';
    book.version = '1';
    expect(book).toBeTruthy();
  });

});
