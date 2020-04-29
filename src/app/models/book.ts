export class Book {
    isbN10: string;
    isbN13: string;
    title: string;
    about: string;
    abstract: string;
    author: {
        href: string;
        id: string;
        name: string;
    };
    publisher: string;
    datePublished: Date;
    image: string;
    tags: string[];
    version: string;
}
