import React, {Component} from 'react';
import './App.css';
import TitleView from './view/TitleView'
import BookListView from "./view/BookListView";
import SearchScreenView from "./view/SearchScreenView"
import { Link, Route } from "react-router-dom"
import * as BooksAPI from './data/BooksAPI'

class App extends Component {
    state = {
        bookListReading: [],
        bookListWantToRead: [],
        bookListRead: []
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
            <SearchScreenView/>
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
                    <BookListView bookList={this.state.bookListReading} onBookUpdated={this.onBookUpdated.bind(this)}/>

                    <TitleView textTitle="Want to Read"/>
                    <BookListView bookList={this.state.bookListWantToRead} onBookUpdated={this.onBookUpdated.bind(this)}/>

                    <TitleView textTitle="Read"/>
                    <BookListView bookList={this.state.bookListRead} onBookUpdated={this.onBookUpdated.bind(this)}/>
                </div>
                <div className="mr-open-search">
                    <Link to="/search" >Add Book</Link>
                </div>
            </div>
        );
    }

    onBookUpdated(updatedIds) {
        console.log("onBookUpdated " + JSON.stringify(updatedIds));
        this.updateBooks(updatedIds);
    }

    updateBooks(updatedIds) {
        console.log("loadAllBooks " + JSON.stringify(updatedIds));

        this.setState({
            bookListReading: [],
            bookListWantToRead: [],
            bookListRead: []
        });


        this.loadAllBooks()
    }

    loadAllBooks() {
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
}

export default App;
