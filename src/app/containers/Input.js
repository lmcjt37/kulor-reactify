import React from 'react';
import Input from '../components/FormInput';
import ColourHelper from '../helper/colourHelper.js';

import themedInputLight from '../theme/themedInputLight.scss';
import themedInputDark from '../theme/themedInputDark.scss';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFocus(name) {
      document.querySelectorAll(`[data-ref=${name}] p`).forEach(p => p.style.opacity = 1);
  }

  handleBlur(name) {
      const inputWrapper = `[data-ref=${name}]`;
      document.querySelectorAll(`input[name=${name}]`).forEach(input => {
          if (input.value === '' || input.value.length === 0 || input.value < 0) {
              document.querySelectorAll(`${inputWrapper} p`).forEach(p => p.style.opacity = 0);
          }
      });
  }

  handleChange(name, value) {
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
    }
    return ["rgb", "hex"].map(type => {

      const {[type]: {prefix = null, suffix = null}} = typeDecoration;

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
          {...{prefix, suffix}} />
      )
    });
  }

  getInputTheme(theme) {
      if (theme === "dark") {
          return themedInputDark;
      }
      return themedInputLight;
  }

  render () {
      return (
          <section className={this.getInputTheme(this.props.theme)['wrapper']} >
            {this.getColourInputs()}
          </section>
      );
  }
}

export default Inputs;
