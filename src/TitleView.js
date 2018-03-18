import React, { Component } from 'react'
import './MyReads.css';

class TitleView extends Component {

    render() {
        return (
            <div className="mr-title">
                <p className="mr-title-text">Title</p>
                <div className="mr-title-line" />
            </div>
        );
    }
}

export default TitleView;