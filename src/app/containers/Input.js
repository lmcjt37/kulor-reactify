import React from 'react';
import Input from '../components/FormInput';
import ColourHelper from '../helper/colourHelper.js';

import themedInputLight from '../theme/themedInputLight.scss';
import themedInputDark from '../theme/themedInputDark.scss';

export default class Inputs extends React.Component {

    constructor(props) {
        super(props);
    }

    handleFocus(type) {
        this.props.onStateChange({
            [`${type}Opacity`] : 1
        });

    }

    handleBlur(type) {
        const {value, name} = this[`${type}`];

        if (value === '' || value.length === 0 || value < 0) {
            this.props.onStateChange({
                [`${name}Opacity`] : 0
            });
      }
    }

    handleChange(type) {
        const {value, name} = this[`${type}`];
        const trimType = `trim${name.charAt(0).toUpperCase()}${name.slice(1)}`;

        this.props.onStateChange({
            [name]: ColourHelper[trimType](value),
            'type': name
        });
    }

    getColourInputs() {
        const typeDecoration = {
            rgb: {
                prefix: '(',
                suffix: ')'
            },
            hex: {
                prefix: '#',
                suffix: ''
            }
        };

        return ["rgb", "hex"].map(type => {

            const {[type]: {prefix = null, suffix = null}} = typeDecoration;

            return (
                <Input
                    key={type}
                    type='text'
                    label={type.toUpperCase()}
                    name={type}
                    value={this.props[type]}
                    onFocus={() => this.handleFocus(type)}
                    onBlur={() => this.handleBlur(type)}
                    onChange={() => this.handleChange(type)}
                    theme={this.getInputTheme(this.props.theme)}
                    opacity={this.props[`${type}Opacity`]}
                    {...{prefix, suffix}} />
            );
        });
    }

    getInputTheme(theme) {
        if (theme === "dark") {
            return themedInputDark;
        }
        return themedInputLight;
    }

    componentDidMount() {
        document.querySelectorAll('input').forEach(input => this[`${input.name}`] = input);
    }

    render () {
      return (
            <section className={this.getInputTheme(this.props.theme)['wrapper']} >
                {this.getColourInputs()}
            </section>
        );
    }
}
