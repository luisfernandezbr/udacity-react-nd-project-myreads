import React, {Component} from 'react';
import './App.css';
import TitleView from './view/TitleView'
import BookListView from "./view/BookListView";
import * as BooksAPI from './data/BooksAPI'

class App extends Component {
    state = {
        bookListReading: [],
        bookListWantToRead: [],
        bookListRead: [],
        showSearchPage: false
    }

    componentDidMount () {
        BooksAPI.getAll().then(books => {
            books.map(book => {
                if (book.shelf === 'currentlyReading') {
                    this.setState({
                        bookListReading: this.state.bookListReading.concat(book)
                    });
                } else if (book.shelf === 'wantToRead') {
                    this.setState({
                        bookListWantToRead: this.state.bookListWantToRead.concat(book)
                    });
                } else if (book.shelf === 'read') {
                    this.setState({
                        bookListRead: this.state.bookListRead.concat(book)
                    });
                }
            });
        });
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.showSearchPage ? (
                        this.showSearchResult()
                    ) : (
                        this.showListResult()
                    )
                }
            </div>
        )
    }

    showSearchResult() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                      You can find these search terms here:
                                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                      you don't find a specific author or title. Every search is limited by search terms.
                                    */

                        }
                        <input type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <BookListView bookList={this.state.bookListReading}/>
                </div>
            </div>
        );
    }

    showListResult() {
        return (
            <div>
                <header className="mr-header">
                    <h1 className="mr-header-title">MyReads</h1>
                </header>
                <div>
                    <TitleView textTitle="Currently Reading"/>
                    <BookListView bookList={this.state.bookListReading}/>

                    <TitleView textTitle="Want to Read"/>
                    <BookListView bookList={this.state.bookListWantToRead}/>

                    <TitleView textTitle="Read"/>
                    <BookListView bookList={this.state.bookListRead}/>
                </div>
                <div className="mr-open-search">
                    <a onClick={this.onCLickAddBook()}>Add Book</a>
                </div>
            </div>
        );
    }

    onCLickAddBook() {
        return () => this.setState({
            showSearchPage: true
        });
    }
}

export default App;
