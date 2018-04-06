import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookView extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateBook: PropTypes.func.isRequired
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
                            this.props.onUpdateBook(book, event.target.value)
                        }}>
                            <option value="" disabled>Move to...</option>
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