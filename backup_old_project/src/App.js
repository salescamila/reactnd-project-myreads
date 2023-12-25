import React from 'react';
import * as BooksAPI from './utils/BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import SearchBook from './SearchBook';
import ListBooks from './ListBooks';

/**
 * @description Application My Reads
 * @constructor
 */
class BooksApp extends React.Component {
  state = {
    books: [],
    booksFound: []
  }

  /**
   * @description Get books after component mount
   */
  componentDidMount() {
    this.getBooks();
  }

  /**
   * @description Get books saved on shelvies and set to state
   */
  getBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books,
          booksFound: this.state.booksFound
        }));
      });
  }

  /**
   * @description Search for text inputted and update the books with setState
   * @param {string} query
   */
  search(query) {
    query = query.trim();
    if (query !== '') {
      BooksAPI.search(query)
        .then((booksFound) => {
          this.setState(() => ({
            books: this.state.books,
            booksFound: booksFound
          }));
        });
    } else {
      this.setState(() => ({
        books: this.state.books,
        booksFound: []
      }));
    }
  }

  /**
   * @description Updates book's shelf
   * @param {object} book
   * @param {string} shelf
   */
  updateBook(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(this.getBooks());
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={({ history }) => (
          <ListBooks
            books={this.state.books}
            onOpenSearch={() => {
              history.push('/search');
              this.getBooks();
            }}
            onChangeShelf={(book, shelf) => (
              this.updateBook(book, shelf)
            )}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBook
            books={this.state.books}
            booksFound={this.state.booksFound}
            onSearch={(query) => {
              this.search(query);
            }}
            onCloseSearch={() => {
              history.push('/');
            }}
            onChangeShelf={(book, shelf) => (
              this.updateBook(book, shelf)
            )}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
