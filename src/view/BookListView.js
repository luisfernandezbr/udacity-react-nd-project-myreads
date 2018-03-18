import React, { Component } from 'react';
import BookView from "./BookView";
import PropTypes from 'prop-types'

class BookListView extends Component {
    propTypes = {
        bookList: PropTypes.array.isRequired
    }
    render() {
        return (
            <div>
                {this.props.bookList.map(
                    book => <BookView book={book} />
                )}
            </div>
        );
    }
}

export default BookListView