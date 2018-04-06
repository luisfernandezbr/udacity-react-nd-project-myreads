import React, {Component} from 'react';
import PropTypes from 'prop-types'

import BookView from "./BookView";

class BookListView extends Component {
    static propTypes = {
        bookList: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="mr-book-list-content" style={{flex: 1}}>
                <ol className="mr-book-list">
                    {this.props.bookList.map(
                        book => (
                            <li key={book.id}>
                                <BookView book={book} onUpdateBook={this.props.onUpdateBook}/>
                            </li>
                        )
                    )}
                </ol>
            </div>
        );
    }
}

export default BookListView