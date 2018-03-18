import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../style/MyReads.css';

class TitleView extends Component {
    static propTypes = {
        textTitle: PropTypes.string.isRequired,
    }

    render() {
        const textTitle = this.props.textTitle;

        return (
            <div className="mr-title">
                <p className="mr-title-text">{textTitle}</p>
                <div className="mr-title-line" />
            </div>
        );
    }
}

export default TitleView;