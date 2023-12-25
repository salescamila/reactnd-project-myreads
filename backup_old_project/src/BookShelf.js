import React from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';

/**
 * @description Represents a book shelf
 * @constructor
 * @param {string} shelfTitle
 * @param {object} books
 * @param {function} onChangeShelf
 */
function BookShelf({shelfTitle, books, onChangeShelf}) {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          books={books}
          onChangeShelf={(book, shelf) => (onChangeShelf(book, shelf))}
        />
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
