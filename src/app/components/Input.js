import React from 'react';
import Input from 'react-toolbox/lib/input';

class Inputs extends React.Component {
  state = {
      rgb: '',
      hex: ''
  };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  render () {
      return (
          <section>
            <Input type='text' label='RGB' name='rgb' value={this.state.rgb} onChange={this.handleChange.bind(this, 'rgb')} maxLength={9 } />
            <Input type='text' label='HEX' name='hex' value={this.state.hex} onChange={this.handleChange.bind(this, 'hex')} maxLength={6 } />
          </section>
      );
  }
}

export default Inputs;
