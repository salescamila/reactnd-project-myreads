import React from 'react';
import * as BooksAPI from './utils/BooksAPI'
import './App.css';
import { Route } from 'react-router-dom';
import SearchBook from './searchBook';
import ListBooks from './listBooks';

class BooksApp extends React.Component {
  state = {
    books: [],
    booksFound: []
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books,
          booksFound: this.state.booksFound
        }))
        console.log('books', books);
        console.log('booksFound', this.state.booksFound);
      });
  }

  search(query) {
    if (query !== '') {
      BooksAPI.search(query)
        .then((booksFound) => {
          this.setState(() => ({
            books: this.state.books,
            booksFound: booksFound
          }))
          console.log('books', this.state.books);
          console.log('booksFound', booksFound);
        });
    }
  }

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
