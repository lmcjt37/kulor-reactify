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

  handleChange = (name, value) => {
    this.setState({[name]: value, 'type': name});
  };

  render () {
      return (
          <section className={themedInput.wrapper} onKeyUp={this.passToParent.bind(this)}>
            <Input type='text' label='RGB' name='rgb' value={this.state.rgb} onChange={this.handleChange.bind(this, 'rgb')} maxLength={9 } theme={themedInput} />
            <Input type='text' label='HEX' name='hex' value={this.state.hex} onChange={this.handleChange.bind(this, 'hex')} maxLength={6 } theme={themedInput} />
          </section>
      );
  }
}

export default Inputs;
