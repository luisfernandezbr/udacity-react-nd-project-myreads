import React, { Component } from "react"
import BookListView from "./BookListView";
import { Link } from "react-router-dom"
import * as BooksAPI from "../data/BooksAPI";
import PropTypes from "prop-types";

class SearchScreenView extends Component {

    static propTypes = {
        bookList: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    state = {
        query: '',
        searchBookList: []
    }

    searchBooks(query) {
        console.log(`current query: ${query}`)
        console.log(`current query length: ${query.length}`)

        if (query.length > 2 ) {
            BooksAPI.search(query).then(searchBookList => {
                if (this.hasBooksOnResponse(searchBookList)) {

                    let shelvedSearchBookList = searchBookList.map( foundBook => {
                        let [filtered] = this.props.bookList.filter(
                            shelvedBook => (shelvedBook.id === foundBook.id)
                        )

                        if (filtered) {
                            foundBook.shelf = filtered.shelf
                        } else {
                            foundBook.shelf = 'none' ;
                        }

                        console.log("foundBook " + JSON.stringify(foundBook.shelf));

                        return foundBook;
                    })

                    this.setState(() => ({
                        searchBookList: shelvedSearchBookList
                    }))
                } else {
                    this.setState(() => ({
                        searchBookList: []
                    }))
                }

            }).catch(
                console.log("error!!!")
            )
        } else {
            this.setState(() => ({
                searchBookList: []
            }))
        }
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
                        {/*
                                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                      You can find these search terms here:
                                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                      you don't find a specific author or title. Every search is limited by search terms.
                                    */

                        }
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.searchBooks(event.target.value)}
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