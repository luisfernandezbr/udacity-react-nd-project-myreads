import React, {Component} from "react"
import PropTypes from "prop-types";
import debounce from 'lodash.debounce';

import {Link} from "react-router-dom"

import * as BooksAPI from "../data/BooksAPI";
import BookListView from "./BookListView";

class SearchScreenView extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.emitChangeDebounced = debounce(this.searchBooks, 300);
    }

    static propTypes = {
        bookList: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired,
        onShowLoading: PropTypes.func.isRequired,
        onHideLoading: PropTypes.func.isRequired
    }

    state = {
        query: '',
        searchBookList: []
    }

    handleChange(event) {
        this.emitChangeDebounced(event.target.value);
    }

    searchBooks(query) {
        if (query.length > 2) {

            this.props.onShowLoading(`Searching by '${query}'`);

            BooksAPI.search(query).then(searchBookList => {
                if (this.hasBooksOnResponse(searchBookList)) {

                    const shelvedSearchBookList = searchBookList.map(foundBook => {
                        const [filtered] = this.props.bookList.filter(
                            shelvedBook => (shelvedBook.id === foundBook.id)
                        )

                        if (filtered) {
                            foundBook.shelf = filtered.shelf
                        } else {
                            foundBook.shelf = 'none'
                        }

                        return foundBook;
                    })

                    this.setState(() => ({
                        searchBookList: shelvedSearchBookList
                    }))

                    this.props.onHideLoading();
                } else {
                    this.handleEmptySearchResult();
                }
            })
        } else {
            this.setState(() => ({
                searchBookList: []
            }))
        }
    }

    handleEmptySearchResult() {
        this.setState(() => ({
            searchBookList: []
        }))
        this.props.onHideLoading()
    }

    hasBooksOnResponse(searchBookList) {
        return JSON.stringify(searchBookList).indexOf("books") > 0;
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookListView
                        bookList={this.state.searchBookList}
                        onUpdateBook={this.props.onUpdateBook}/>
                </div>
            </div>
        )
    }
}

export default SearchScreenView;