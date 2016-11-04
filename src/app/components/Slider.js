import React from 'react';
import Slider from 'react-toolbox/lib/slider';

class Sliders extends React.Component {
  state = {
    hue: 0,
    saturation: 0,
    lightness: 0
  };

  handleChange = (slider, value) => {
    const newState = {};
    newState[slider] = value;
    this.setState(newState);
  };

  render () {
    return (
      <section>
        <p>Hue</p>
        <Slider min={0} max={360} step={1} editable value={this.state.hue} onChange={this.handleChange.bind(this, 'hue')} />
        <p>Saturation</p>
        <Slider min={0} max={100} step={1} editable value={this.state.saturation} onChange={this.handleChange.bind(this, 'saturation')} />
        <p>Lightness</p>
        <Slider min={0} max={100} step={1} editable value={this.state.lightness} onChange={this.handleChange.bind(this, 'lightness')} />
      </section>
    );
  }
}

export default Sliders;
