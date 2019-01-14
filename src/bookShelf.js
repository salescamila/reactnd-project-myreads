import React from 'react';
import BooksGrid from './booksGrid';

function BookShelf({shelfTitle, books}) {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={books}/>
      </div>
    </div>
  )
}

export default BookShelf;