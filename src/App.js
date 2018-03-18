import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TitleView from './view/TitleView'
import BookView from "./view/BookView";
import BookListView from "./view/BookListView";

class App extends Component {
    render() {
        const book = {
            title:"The Linux Command Line",
            author:"William E. Shotts, Jr.",
            previewUrl:"http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        }
        const bookList = [book, book, book];

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

                <BookListView bookList={bookList}/>
            </div>
        );
    }
}

export default App;
