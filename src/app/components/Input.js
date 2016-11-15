import React from 'react';
import Input from 'react-toolbox/lib/input';

import ColourHelper from '../helper/colourHelper.js';

import themedInputLight from '../theme/themedInputLight.scss';
import themedInputDark from '../theme/themedInputDark.scss';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFocus = (name) => {
      var elements = document.querySelectorAll('[data-ref=' + name + ']')[0].getElementsByTagName("p");
      for(var i = 0; i < elements.length; i++) {
              elements[i].style.opacity = 1;
      }
  };

  handleBlur = (name) => {
      var collection = document.querySelectorAll('[data-ref=' + name + ']')[0];
      var paragraphs = collection.getElementsByTagName("p");
      var input = collection.getElementsByTagName("Input");
      for(var i = 0; i < paragraphs.length; i++) {
            if (input[0].value && input[0].value.length <= 0 || input[0].value === "") {
                paragraphs[i].style.opacity = 0;
            }
      }
  };

  handleChange = (name, value) => {
      this.props.onStateChange({
          [name]: (name === "rgb") ? ColourHelper.trimRgb(value) : ColourHelper.trimHex(value),
          'type': name
      });
  };

  render () {
      var themedInput;
      if (this.props.theme === "light") {
          themedInput = themedInputLight;
      } else {
          themedInput = themedInputDark;
      }
      return (
          <section className={themedInput.wrapper} >
            <div className={themedInput.rgbWrapper} data-ref="rgb" >
                <p className={themedInput.inputPrefix} >rgb(</p>
                <Input type='text' label='RGB' name='rgb' value={this.props.rgb} onFocus={this.handleFocus.bind(this, 'rgb')} onBlur={this.handleBlur.bind(this, 'rgb')} onChange={this.handleChange.bind(this, 'rgb')} theme={themedInput} />
                <p className={themedInput.inputSuffix} >)</p>
            </div>
            <div className={themedInput.hexWrapper} data-ref="hex" >
                <p className={themedInput.inputPrefix} >#</p>
                <Input type='text' label='HEX' name='hex' value={this.props.hex} onFocus={this.handleFocus.bind(this, 'hex')} onBlur={this.handleBlur.bind(this, 'hex')} onChange={this.handleChange.bind(this, 'hex')} theme={themedInput} />
            </div>
          </section>
      );
  }
}

export default Inputs;
