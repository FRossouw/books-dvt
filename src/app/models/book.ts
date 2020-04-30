import { Tag } from './tag';
import { BookAuthor } from './book-author';

export class Book {
    isbn10: string;
    isbn13: string;
    title: string;
    about: string;
    abstract: string;
    author: BookAuthor;
    publisher: string;
    date_published: Date;
    image: string;
    tags: Tag[];
}
