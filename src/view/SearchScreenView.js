import React, { Component } from "react"
import BookListView from "./BookListView";
import * as BooksAPI from "../data/BooksAPI";

class SearchScreenView extends Component {

    state = {
        query: '',
        bookList: []
    }

    searchBooks(query) {
        console.log(`current query: ${query}`)
        console.log(`current query length: ${query.length}`)

        if (query.length > 2 ) {
            BooksAPI.search(query).then(bookList => {

                console.log(JSON.stringify(bookList))
                console.log(Array.isPrototypeOf(bookList))


                if (JSON.stringify(bookList).indexOf("books") > 0) {

                    bookList.map(book => console.log(book.toString()))
                    this.setState(() => ({
                        bookList: bookList
                    }))
                } else {
                    this.setState(() => ({
                        bookList: []
                    }))
                }

            }).catch(
                console.log("error!!!")
            )
        } else {
            this.setState(() => ({
                bookList: []
            }))
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search">Close</a>
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
                    <BookListView bookList={this.state.bookList}/>
                </div>
            </div>
        )
    }
}

export default SearchScreenView;