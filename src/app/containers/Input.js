import React from 'react';
import Input from '../components/FormInput';
import ColourHelper from '../helper/colourHelper.js';

import themedInputLight from '../theme/themedInputLight.scss';
import themedInputDark from '../theme/themedInputDark.scss';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFocus = (name) => {
      const elements = document.querySelectorAll('[data-ref=' + name + ']')[0].getElementsByTagName("p");
      for(let i in elements) {
              elements[i].style.opacity = 1;
      }
  };

  handleBlur = (name) => {
      const collection = document.querySelectorAll('[data-ref=' + name + ']')[0];
      const paragraphs = collection.getElementsByTagName("p");
      const input = collection.getElementsByTagName("Input");

      for (let i in paragraphs) {
            if (input[0].value && input[0].value.length <= 0 || input[0].value === "") {
                paragraphs[i].style.opacity = 0;
            }
      }
  };

  handleChange = (name, value) => {
      const trimType = `trim${name.charAt(0).toUpperCase()}${name.slice(1)}`;

      this.props.onStateChange({
          [name]: ColourHelper[trimType](value),
          'type': name
      });
  };

  render () {

      let themedInput;
      if (this.props.theme === "dark") {
          themedInput = themedInputDark;
      } else {
          themedInput = themedInputLight;
      }

      const Inputs = ["rgb", "hex"].map(type => (
          <Input
            key={type}
            type='text'
            label={type.toUpperCase()}
            name={type}
            value={this.props[type]}
            onFocus={this.handleFocus.bind(this, type)}
            onBlur={this.handleBlur.bind(this, type)}
            onChange={this.handleChange.bind(this, type)}
            theme={themedInput} />
      ));

      return (
          <section className={themedInput.wrapper} >
            {Inputs}
          </section>
      );
  }
}

export default Inputs;
