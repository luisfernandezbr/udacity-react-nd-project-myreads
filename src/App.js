import React, {Component} from 'react';
import './App.css';
import SearchScreenView from "./view/SearchScreenView"
import { Link, Route } from "react-router-dom"
import * as BooksAPI from './data/BooksAPI'
import BookShelfView from "./view/BookShelfView";

class App extends Component {
    state = {
        bookList: []
    }

    componentDidMount () {
        this.loadAllBooks();
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    this.showListResult()
                )}/>
                <Route path="/search" render={() => (
                    this.showSearchResult()
                )}/>
            </div>
        )
    }

    showSearchResult() {
        return (
            <SearchScreenView
                bookList={this.state.bookList}
                onUpdateBook={this.onUpdateBook.bind(this)}
            />
        );
    }

    showListResult() {
        const SHELVES = [{
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
                        SHELVES.map(shelf => (
                            <BookShelfView
                                key={shelf.key}
                                shelfKey={shelf.key}
                                shelfTitle={shelf.title}
                                bookList={
                                    this.state.bookList.filter(
                                        book => (book.shelf === shelf.key)
                                    )
                                }
                                onUpdateBook={this.onUpdateBook.bind(this)}
                            />
                        ))
                    }
                </div>
                <div className="mr-open-search">
                    <Link to="/search" >Add Book</Link>
                </div>
            </div>
        );
    }

    onUpdateBook(updatedBook, shelf) {
        console.log(`[updatedBook: ${updatedBook.title}], [shelf: ${shelf}]`);

        BooksAPI.update(updatedBook, shelf)
            .then(() => {
                const filteredList = this.state.bookList.filter(
                    book => (book.id !== updatedBook.id)
                )

                updatedBook.shelf = shelf;

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
                bookList: books
            })
        });
    }
}

export default App;
