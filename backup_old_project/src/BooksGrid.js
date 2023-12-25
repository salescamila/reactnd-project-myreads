import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/**
 * @description List all the books of a shelf on a grid
 * @constructor
 * @param {object} books
 * @param {function} onChangeShelf
 */
function BooksGrid({books, onChangeShelf}) {
  return (
    <ol className="books-grid" key={books}>
      {books.map((b, i) => (
        <Book
          item={b}
          key={i}
          onChangeShelf={(book, shelf) => (onChangeShelf(book, shelf))}
        />
      ))}
    </ol>
  )
}

BooksGrid.PropTypes = {
  books: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
}

export default BooksGrid;
