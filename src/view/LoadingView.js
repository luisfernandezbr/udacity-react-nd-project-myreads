import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { BounceLoader } from 'react-spinners';

class LoadingView extends Component {
    static propTypes = {
        loading : PropTypes.bool.isRequired,
        loadingTitle : PropTypes.string.isRequired
    }


    render () {
        return (
            this.props.loading &&
            <div className="mr-loading">
                <div>
                    <h1 className="mr-loading-title">{this.props.loadingTitle}</h1>
                    <div className="mr-loading-content">
                        <BounceLoader
                            className="mr-loading-spinner"
                            color={'#2e7c31'}
                            loading={this.props.loading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoadingView;