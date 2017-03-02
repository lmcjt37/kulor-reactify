import React from 'react';
import Button from '../components/Button';
import ColourHelper from '../helper/colourHelper';
import themedButton from '../theme/themedButton';

export default class ButtonBar extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(name) {
        switch(name){
            case "random":
                this.props.onStateChange(ColourHelper.randomise());
                break;
            case "lighten":
                this.props.onStateChange(ColourHelper.lighten(this.props.hex));
                break;
            case "darken":
                this.props.onStateChange(ColourHelper.darken(this.props.hex));
                break;
        }

    }

    getButtons() {
        const array = [];
        for (var prop in this.props.features) {
            array.push(prop);
        }
        return array.map(name => {
            return (
                <Button
                    key={name}
                    theme={themedButton}
                    onMouseUp={() => this.handleClick(name)}
                    {...this.props.features[name]} />
            );
        });

    }

    render() {
        return (
            <div className={this.props.buttonBarClasses}>
                {this.getButtons()}
            </div>
        );
    }
}
