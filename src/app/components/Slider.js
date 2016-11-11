import React from 'react';
import { Slider } from 'react-toolbox/lib/slider';
import themedSlider from '../theme/themedSlider.scss';

class Sliders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      saturation: 0,
      lightness: 0,
      type: ''
    };
  }

  handleChange = (slider, value) => {
    this.setState({[slider]: value, 'type': slider});
    this.props.onStateChange(this.state);
  };

  render () {
    return (
      <section className={themedSlider.wrapper}>
        <p className={themedSlider.sliderLabel} >Hue</p>
        <Slider min={0} max={360} step={1} editable value={this.state.hue} onChange={this.handleChange.bind(this, 'hue')} theme={themedSlider} />
        <p className={themedSlider.sliderLabel} >Saturation</p>
        <Slider min={0} max={100} step={1} editable value={this.state.saturation} onChange={this.handleChange.bind(this, 'saturation')} theme={themedSlider} />
        <p className={themedSlider.sliderLabel} >Lightness</p>
        <Slider min={0} max={100} step={1} editable value={this.state.lightness} onChange={this.handleChange.bind(this, 'lightness')} theme={themedSlider} />
      </section>
    );
  }
}

export default Sliders;
