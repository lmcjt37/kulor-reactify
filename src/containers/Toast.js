import React from 'react';
import Snackbar from 'react-toolbox/lib/snackbar';

export default class Toast extends React.Component {

    constructor(props) {
        super(props);
    }

    handleDismissal = () => {
        this.props.onStateChange({ showToast: false });
    };

    render () {
        return (
            <Snackbar
                active={this.props.showToast}
                label={this.props.toastMessage}
                timeout={3000}
                onTimeout={this.handleDismissal}
                type='accept'
            />
        );
    }
}
