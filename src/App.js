import React, {Component} from 'react';
import {Link, Route} from "react-router-dom"


import './App.css';
import * as BooksAPI from './data/BooksAPI'
import SearchScreenView from "./view/SearchScreenView"
import BookShelfView from "./view/BookShelfView";
import LoadingView from "./view/LoadingView";

class App extends Component {
    state = {
        bookList: [],
        loading: true,
        loadingTitle: "Loading Shelves…"
    }

    componentDidMount() {
        this.loadAllBooks();
    }

    render() {
        return (
            <div className="mr-main">
                <Route exact path="/" render={() => (
                    this.showListResult()
                )}/>
                <Route path="/search" render={() => (
                    this.showSearchResult()
                )}/>
                <LoadingView loadingTitle={this.state.loadingTitle} loading={this.state.loading} />
            </div>
        )
    }



    showSearchResult() {
        return (
            <SearchScreenView
                bookList={this.state.bookList}
                onUpdateBook={this.updateBook.bind(this)}
                onShowLoading={this.showLoading.bind(this)}
                onHideLoading={this.hideLoading.bind(this)}
            />
        );
    }

    showListResult() {
        const BOOK_SHELVES = [{
            title: 'Currently Reading',
            key: 'currentlyReading'
        }, {
            title: 'Want to read',
            key: 'wantToRead'
        }, {
            title: 'Read',
            key: 'read'
        }];

        return (
            <div>
                <header className="mr-header">
                    <h1 className="mr-header-title">MyReads</h1>
                </header>
                <div>
                    {
                        BOOK_SHELVES.map(shelf => (
                            <BookShelfView
                                key={shelf.key}
                                shelfKey={shelf.key}
                                shelfTitle={shelf.title}
                                bookList={
                                    this.state.bookList.filter(
                                        book => (book.shelf === shelf.key)
                                    )
                                }
                                onUpdateBook={this.updateBook.bind(this)}
                            />
                        ))
                    }
                </div>
                <div className="mr-open-search">
                    <Link to="/search">Add Book</Link>
                </div>
            </div>
        );
    }

    updateBook(updatedBook, newShelf) {
        console.log(`[updatedBook: ${updatedBook.title}], [newShelf: ${newShelf}]`);

        BooksAPI.update(updatedBook, newShelf)
            .then(() => {
                const filteredList = this.state.bookList.filter(
                    book => (book.id !== updatedBook.id)
                )

                updatedBook.shelf = newShelf;

                this.setState({
                    bookList: filteredList.concat([updatedBook])
                })
            })
            .catch(error => {
                console.error("Error trying to update book shelf. > " + error)
            })
    }

    loadAllBooks() {
        BooksAPI.getAll().then(books => {
            this.setState({
                bookList: books,
                loading: false
            })
        });
    }

    showLoading(loadingTitle) {
        console.log(`[showLoading: ${loadingTitle}]`);
        this.setState({
            loadingTitle: loadingTitle,
            loading: true
        })
    }

    hideLoading() {
        console.log(`[hideLoading]`);
        this.setState({
            loading: false
        })
    }
}

export default App;
