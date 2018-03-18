import React, { Component } from 'react'

class BookView extends Component {
    render() {
        return (
            <div>
                <img className="mr-book"/>
                <div>Book Title</div>
                <div>Author</div>
            </div>
        );
    }
}

export default BookView;