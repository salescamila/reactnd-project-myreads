import React from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import './App.css';

/**
 * @description Main page of the application with all
 *              the bookshelvies and books associated
 * @constructor
 * @param {object} books
 * @param {function} onOpenSearch
 * @param {function} onChangeShelf
 */
function ListBooks({ books, onOpenSearch, onChangeShelf }) {
  const shelfReading = books.filter((book) => {return book.shelf === 'currentlyReading'});
  const shelfToRead = books.filter((book) => {return book.shelf === 'wantToRead'});
  const shelfRead = books.filter((book) => {return book.shelf === 'read'});

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads: A Book Lending App</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          shelfTitle={'Currently Reading'}
          books={shelfReading}
          onChangeShelf={(book, shelf) => (onChangeShelf(book, shelf))}
        />
        <BookShelf
          shelfTitle={'To Read'}
          books={shelfToRead}
          onChangeShelf={(book, shelf) => (onChangeShelf(book, shelf))}
        />
        <BookShelf
          shelfTitle={'Read'}
          books={shelfRead}
          onChangeShelf={(book, shelf) => (onChangeShelf(book, shelf))}
        />
        <div className="open-search">
          <button onClick={() => onOpenSearch()}>Add a book</button>
        </div>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onOpenSearch: PropTypes.func.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
}

export default ListBooks;
