import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookView extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }

    render() {
        const book = this.props.book;

        return (
            <div className="mr-book">
                <img alt={book.name} className="mr-book-image" style={{
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                }}/>
                <div className="mr-book-title">{book.title}</div>
                <div className="mr-book-author">{book.authors}</div>
                <br />
            </div>
        );
    }
}

export default BookView;