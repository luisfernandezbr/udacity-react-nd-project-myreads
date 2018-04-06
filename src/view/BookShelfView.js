import React, {Component} from 'react';
import PropTypes from 'prop-types'
import TitleView from "./TitleView";
import BookListView from "./BookListView";

class BookShelfView extends Component {
    static propTypes = {
        shelfTitle: PropTypes.string.isRequired,
        shelfKey: PropTypes.string.isRequired,
        bookList: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <TitleView textTitle={this.props.shelfTitle}/>
                <BookListView
                    bookList={this.props.bookList}
                    onUpdateBook={this.props.onUpdateBook.bind(this)}
                />
            </div>
        );
    }
}

export default BookShelfView