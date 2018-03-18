import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookView extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired
    }

    render() {
        const book = this.props.book;

        return (
            <div>
                <img className="mr-book" style={{
                    backgroundImage: `url(${book.previewUrl})`
                }}/>
                <div>{book.title}</div>
                <div>{book.author}</div>
            </div>
        );
    }
}

export default BookView;