import { AuthorBook } from './author-book';

export class Author {
    href: string;
    id: string;
    first_name: string;
    middle_names: string;
    last_name: string;
    name: string;
    about: string;
    version: string;
    books: AuthorBook[];
}
