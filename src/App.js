import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TitleView from './view/TitleView'
import BookListView from "./view/BookListView";
import * as BooksAPI from './data/BooksAPI'

class App extends Component {
    state = {
        bookList: []
    }

    componentDidMount () {
        BooksAPI.getAll().then(books => {
            this.setState({
                bookList: books
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
                <TitleView titleText="My Title"/>
                <BookListView bookList={this.state.bookList}/>
            </div>
        );
    }
}

export default App;
