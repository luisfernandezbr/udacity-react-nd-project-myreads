import React, { Component } from 'react';
import BookView from "./BookView";
import PropTypes from 'prop-types'

class BookListView extends Component {
    static propTypes = {
        bookList: PropTypes.array.isRequired,
        onBookUpdated: PropTypes.func
    }

    render() {
        return (
            <div className="mr-book-list-content" style={{flex: 1}}>
                <ol className="mr-book-list">
                {this.props.bookList.map(
                    (book, index)=> (
                        <li key={index}>
                            <BookView book={book} onBookUpdated={this.props.onBookUpdated}/>
                        </li>
                    )
                )}
                </ol>
            </div>
        );
    }
}

export default BookListView