import React from 'react';
import Input from '../components/FormInput';
import ColourHelper from '../helper/colourHelper';
import themedInputLight from '../theme/themedInputLight';
import themedInputDark from '../theme/themedInputDark';

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
        //TODO: this[`${type}`] is undefined

        console.log("handleChange");
        console.log(this);
        // console.log(this[`${type}`]);

        const {value, name} = this[`${type}`];
        const trimType = `trim${name.charAt(0).toUpperCase()}${name.slice(1)}`;

        this.props.onStateChange({
            [name]: ColourHelper[trimType](value),
            'type': name
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
                    onFocus={() => this.handleFocus(type)}
                    onBlur={() => this.handleBlur(type)}
                    onChange={() => this.handleChange(type)}
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
