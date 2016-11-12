import React from 'react';
import Input from 'react-toolbox/lib/input';
import themedInput from '../theme/themedInput.scss';

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rgb: '',
        hex: '',
        type: ''
    };
  }

  passToParent = () => {
      this.props.onStateChange(this.state);
  };

  handleFocus = (name) => {
      var elements = document.querySelectorAll('[data-ref=' + name + ']')[0].getElementsByTagName("p");
      for(var i = 0; i < elements.length; i++) {
              elements[i].style.opacity = 1;
      }
  };

  handleBlur = (name) => {
      var elements = document.querySelectorAll('[data-ref=' + name + ']')[0].getElementsByTagName("p");
      for(var i = 0; i < elements.length; i++) {
              elements[i].style.opacity = 0;
      }
  };

  handleChange = (name, value) => {
      this.setState({[name]: value, 'type': name});
  };

  render () {
      return (
          <section className={themedInput.wrapper} onKeyUp={this.passToParent.bind(this)}>
            <div className={themedInput.rgbWrapper} data-ref="rgb" >
                <p className={themedInput.inputPrefix} >rgb(</p>
                <Input type='text' label='RGB' name='rgb' value={this.state.rgb} onFocus={this.handleFocus.bind(this, 'rgb')} onBlur={this.handleBlur.bind(this, 'rgb')} onChange={this.handleChange.bind(this, 'rgb')} maxLength={9 } theme={themedInput} />
                <p className={themedInput.inputSuffix} >)</p>
            </div>
            <div className={themedInput.hexWrapper} data-ref="hex" >
                <p className={themedInput.inputPrefix} >#</p>
                <Input type='text' label='HEX' name='hex' value={this.state.hex} onFocus={this.handleFocus.bind(this, 'hex')} onBlur={this.handleBlur.bind(this, 'hex')} onChange={this.handleChange.bind(this, 'hex')} maxLength={6 } theme={themedInput} />
            </div>
          </section>
      );
  }
}

export default Inputs;
