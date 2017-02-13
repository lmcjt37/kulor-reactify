import React from 'react';
import Button from '../components/Button';
import ColourHelper from '../helper/colourHelper.js';

export default class ButtonBar extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick() {
        this.props.onStateChange(ColourHelper.randomise());
    }

    render() {
        return (
            <div className={this.props.buttonBarClasses}>
                <Button
                    onMouseUp={() => this.handleClick()}
                    {...this.props.random} />
            </div>
        );
    }
}
