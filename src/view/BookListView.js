import React, {Component} from 'react';
import BookView from "./BookView";


class BookListView extends Component {
    render() {
        return (
            <div>
                <BookView book={{
                    title:"The Linux Command Line",
                    author:"William E. Shotts, Jr.",
                    previewUrl:"http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                }}/>
                <BookView book={{
                    title:"The Linux Command Line",
                    author:"William E. Shotts, Jr.",
                    previewUrl:"http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                }}/>
            </div>
        );
    }
}

export default BookListView