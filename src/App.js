import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TitleView from './view/TitleView'
import BookListView from "./view/BookListView";
import * as BooksAPI from './data/BooksAPI'

class App extends Component {
    state = {
        bookListReading: [],
        bookListWantToRead: [],
        bookListRead: []
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
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <TitleView titleText="Currently Reading"/>
                <BookListView bookList={this.state.bookListReading}/>

                <TitleView titleText="Want to Read"/>
                <BookListView bookList={this.state.bookListWantToRead}/>

                <TitleView titleText="Read"/>
                <BookListView bookList={this.state.bookListRead}/>
            </div>
        );
    }
}

export default App;
