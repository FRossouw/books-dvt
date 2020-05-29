# Books-DVT (Web-Ass)

![CircleCI](https://circleci.com/gh/FRossouw/books-dvt/tree/master.svg?style=shield&ircle-token=982a79ea26917a22f54ce3adea772121271936fb) ![GitHub last commit](https://img.shields.io/github/last-commit/FRossouw/books-dvt) ![GitHub pull requests](https://img.shields.io/github/issues-pr/Frossouw/books-dvt) ![GitHub issues](https://img.shields.io/github/issues/Frossouw/books-dvt)

## Introduction
DVT is in the process of building a central repository for its developers to find software development books. The application has been named DVTBooks.

An API has already been created to create, read and update books from a data store.

Develop a frontend to provide functionality to users.

## Project Requirements and Extensions
1. Use Angular 2+ ✅
2. Responsiveness to Desktop and Mobile Devices ✅
3. Internationalization i18n implemented (English, Afrikaans, isiZulu) ✅
4. Follow corporate guidelines for consistency (Theme) ✅
5. The project should be a progressive web application (PWA) ✅
6. The project should be linted statically (Circle CI) ✅
7. The project does not need to be deployed/hosted ✅

### User Useability and Functionality
1. Roles
    * Administrators can create, read, search and update books
    * Users can read and search for books

### Requirements
* Docker Images to run the application
    * str1zzwald/dvt-books-api:1.0.3
    * mcr.microsoft.com/mssql/server:2017-latest

## Notes
* 2020 04 21
    * The API endpoints are secured with OAuth
    * Users will have to present a JWT when making requests
    * Users can acquire access tokens from an identity server (provisioned)
    * The application can use OAuth 2.0 implicit flow
* 2020 04 22 Docker Image (API Version Latest)
* 2020 05 05
    * Docker Image (API Version 1.0.1)
    * Docker Image (API Version 1.0.2)
    * Docker Image (API Version 1.0.3)

## Screenshots

### Home Screen Component (Web and Mobile Views)
Users will be prompted here when they need to login.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-01.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-01.PNG)

### Auth0 Login Service (Web and Mobile Views)
Users will be asked for their credentials through a third party application.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-02.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-02.PNG)

### Book Component (Web and Mobile Views)
Users will use this view to navigate through all the books in the data storage.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-03.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-03.PNG)

### Author Component (Web and Mobile Views)
Users will use this view to navigate through all the authors in the data storage.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-04.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-04.PNG)

### Book View Component (Web and Mobile Views)
Users will view information on a specific book here.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-05.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-05.PNG)

### Author View Component (Web and Mobile Views)
Users will view information on a specific author here.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-06.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-06.PNG)

### Profile Component (Web and Mobile Views)
Users will view their profiles here.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-07.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-07.PNG)

### Book Search Component (Web and Mobile Views)
Users will be diplayed a list of books on relevant search criteria.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-08.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-08.PNG)

### Add Book Component (Web and Mobile Views)
Admin users will be able to add books to the data storage.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-09.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-10.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-09.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-10.PNG)

### Add Author Component (Web and Mobile Views)
Admin users will be able to add authors to the data storage.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-11.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-12.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-11.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-12.PNG)


### Update Book Component (Web and Mobile Views)
Admin users will be able to update books in the data storage.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-13.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-13.PNG)

### Udate Author Component (Web and Mobile Views)
Admin users will be able to update authors in the data storage.

![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/web-view-14.PNG)
![](https://raw.githubusercontent.com/FRossouw/books-dvt/feature-roles-navigation/screenshots/mob-view-14.PNG)

## Outcomes
1. Practiced building components and services ✅
2. Practiced authentication using OAuth & OpenID Connect (OIDC) ✅
3. Practiced consuming REST APIs ✅
4. Used server-side filtering ✅
5. Practiced formatting field values ✅
6. Practiced input validation ✅
7. Implemented unit tests using Karma & Jasmine ✅
8. Used Internationalization (i18n) ✅
9. Practiced Reactive Programming using Rx and Observables ✅
10. Used server-side pagination ✅
11. Loaded data & assets from cache when offline (PWA) ✅
12. Practiced using Docker in an Angular web application ✅
13. Built a modern app using a web framework that calls a secure back-end service. ✅
