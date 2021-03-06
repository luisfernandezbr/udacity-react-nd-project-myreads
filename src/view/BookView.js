import React, {Component} from 'react'
import PropTypes from 'prop-types'

import placeholder from '../image/book-cover-placeholder.jpg'

class BookView extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }


    render() {
        const book = this.props.book;
        const bookPlaceholder = this.loadPlaceholder(book);

        return (
            <div className="mr-book">
                <div className="mr-book-top">

                    <div className="mr-book-image" style={{
                        width: 128,
                        height: 188,
                        backgroundImage: `url(${bookPlaceholder})`
                    }}/>

                    <div className="mr-book-shelf-changer">
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
                {
                    book.authors && book.authors.map((author, index) =>
                        <div key={index} className="mr-book-author">{author}</div>
                    )
                }
            </div>
        );
    }

    loadPlaceholder(book) {
        if (book && book.imageLinks && book.imageLinks.thumbnail) {
            return book.imageLinks.thumbnail;
        } else {
            return placeholder;
        }
    }
}

export default BookView;
