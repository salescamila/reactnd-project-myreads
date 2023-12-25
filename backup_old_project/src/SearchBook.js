import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class SearchBook extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    booksFound: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onCloseSearch: PropTypes.func.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  state = {
    query: ''
  }

  /**
   * @description Updates query's text and calls
   *              function to search whit the text
   * @param {string} text
   */
  UpdateQuery = (text) => {
    this.setState(() => ({
      query: text
    }));
    this.props.onSearch(text);
  }

  /**
   * @description Clear the query's text
   */
  clearQuery = () => {
    this.UpdateQuery('');
  }

  /**
   * @description Calls functions to change book's shelf
   * @param {object} book
   * @param {string} shelf
   */
  changeShelf(book, shelf) {
    if (typeof book !== 'undefined') {
      this.props.onChangeShelf(book, shelf);
    }
  }

  /**
   * @description Get current book's shelf
   * @param {object} books
   * @param {string} bookId
   */
  getBookShelf(books, bookId){
    let bookTemp = [];

    if (typeof books !== 'undefined' && books.length > 0) {
      bookTemp = books.filter((b) => (b.id === bookId));
    }

    if (bookTemp.length === 0){
      return 'none';
    } else {
      return bookTemp[0].shelf;
    }
  }

  render() {
    const { query } = this.state;
    const { books, booksFound, onCloseSearch } = this.props;

    let showingBooks = [];

    if (query !== '' && typeof booksFound !== 'undefined' && booksFound.length > 0
        && typeof books !== 'undefined' && books.length > 0) {
      showingBooks = booksFound.map((b) => {
        b.shelf = this.getBookShelf(books, b.id);
        return b;
      });
    }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => onCloseSearch()}>Close</button>
          <div className="search-books-input-wrapper">
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => (this.UpdateQuery(event.target.value))}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {
              (typeof books !== 'undefined')
              ? showingBooks.map((b, i) => (
                  <Book
                    item={b}
                    key={i}
                    onChangeShelf={(book, shelf) => (this.changeShelf(book, shelf))}
                  />
                ))
              : 'No books found'
            }
          </ol>
        </div>
      </div>
    )
  }
};

export default SearchBook;
