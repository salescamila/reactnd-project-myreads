import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Represents a books
 * @constructor
 * @param {object} item
 * @param {function} onChangeShelf
 */
function Book({item, onChangeShelf}) {
  if (typeof item !== 'undefined') {
    return (
      <li key={item.id}>
        <div className="book">
          <div className="book-top">
            {
              (typeof item.imageLinks !== 'undefined')
              ?<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+item.imageLinks.thumbnail+'")'}}></div>
              :<div className="book-cover"></div>
            }
            <div className="book-shelf-changer">
              <select
                  id='select-status'
                  defaultValue={item.shelf}
                  onChange={(event) => (onChangeShelf(item, event.target.value))}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{item.title}</div>
          {
            (typeof item.authors !== 'undefined')
            ? item.authors.map((author, i) => {
                return (<div className="book-authors" key={i}>{author}</div>);
              })
            : <div className="book-authors"></div>
          }
        </div>
      </li>
    );
  } else {
    return('');
  }
};

Book.PropTypes = {
  item: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
}

export default Book;
