import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../data/BooksAPI'

class BookView extends Component {
    state = {
        currentSelection: 'none'
    }

    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookUpdated: PropTypes.func
    }

    updateBookShelf = (book, shelf) => {
        console.log("book.title: " + book.title);
        console.log("selected shelf: " + shelf);
        BooksAPI.update(book, shelf)
            .then((result) => {
                this.setState({
                    book: book
                });
                if (this.props.onBookUpdated != null) {
                    this.props.onBookUpdated(result);
                }
            })

    }

    render() {
        const book = this.props.book;

        return (
            <div className="mr-book">
                <div className="book-top">
                    <img alt={book.name} className="mr-book-image" style={{
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}/>


                    <div className="book-shelf-changer">
                        <select defaultValue={book.shelf} onChange={event => {
                            this.updateBookShelf(book, event.target.value)
                        }}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>

                </div>

                <div className="mr-book-title">{book.title}</div>
                <div className="mr-book-author">{book.authors}</div>
                <br />
            </div>
        );
    }
}

export default BookView;