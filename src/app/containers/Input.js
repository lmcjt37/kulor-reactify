import React from 'react';
import Input from '../components/FormInput';
import ColourHelper from '../helper/colourHelper';
import themedInputLight from '../theme/themedInputLight';
import themedInputDark from '../theme/themedInputDark';

export default class Inputs extends React.Component {

    constructor(props) {
        super(props);
    }

    handleFocus(input) {
        this.props.onStateChange({
            [`${input}Opacity`] : 1
        });
    }

    handleBlur(input, value) {
        if (value === '' || value.length === 0 || value < 0) {
            this.props.onStateChange({
                [`${input}Opacity`] : 0
            });
        }
    }

    handleChange(input, value) {
        const trimType = `trim${input.charAt(0).toUpperCase()}${input.slice(1)}`;
        this.props.onStateChange({
            [input]: ColourHelper[trimType](value),
            'type': input
        });
    }

    triggerToast(message) {
        this.props.onStateChange({
            showToast: true,
            toastMessage: message
        });
    }

    getColourInputs() {
        const array = [];
        for (var prop in this.props.inputs) {
            array.push(prop);
        }
        return array.map(type => {
            const {[type]: {prefix = null, suffix = null}} = this.props.inputs;
            return (
                <Input
                    key={type}
                    type='text'
                    label={type.toUpperCase()}
                    name={type}
                    value={this.props[type]}
                    onFocus={this.handleFocus.bind(this, type)}
                    onBlur={this.handleBlur.bind(this, type)}
                    onChange={this.handleChange.bind(this, type)}
                    theme={this.getInputTheme(this.props.theme)}
                    opacity={this.props[`${type}Opacity`]}
                    styling={this.props.theme}
                    onToast={(message) => this.triggerToast(message)}
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
        // Fixes NodeList forEach issue
        // https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
        let forEach = (array, callback, scope) => {
            for (var i = 0; i < array.length; i++) {
                callback.call(scope, i, array[i]);
            }
        };

        let nodes = document.querySelectorAll('input');
        forEach(nodes, input => this[`${input.name}`] = input);
    }

    render () {
      return (
            <section className={this.getInputTheme(this.props.theme)['wrapper']} >
                {this.getColourInputs()}
            </section>
        );
    }
}
