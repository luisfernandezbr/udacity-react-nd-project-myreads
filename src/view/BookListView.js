import React, { Component } from 'react';
import BookView from "./BookView";
import PropTypes from 'prop-types'

class BookListView extends Component {
    static propTypes = {
        bookList: PropTypes.array.isRequired
    }

    render() {
        return (
            <div className="mr-book-list-content" style={{flex: 1}}>
                <ol className="mr-book-list">
                {this.props.bookList.map(
                    (book, index)=> (
                        <li key={index}>
                            <BookView book={book} />
                        </li>
                    )
                )}
                </ol>
            </div>
        );
    }
}

export default BookListView