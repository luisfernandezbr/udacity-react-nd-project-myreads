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
                <h2 className="mr-title-text">{textTitle}</h2>
            </div>
        );
    }
}

export default TitleView;