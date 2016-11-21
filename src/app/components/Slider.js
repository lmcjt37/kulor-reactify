import React from 'react';
import { Slider } from 'react-toolbox/lib/slider';

import themedSliderLight from '../theme/themedSliderLight.scss';
import themedSliderDark from '../theme/themedSliderDark.scss';

class Sliders extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (slider, value) => {
      const newState = {
          hue: this.props.hue,
          saturation: this.props.saturation,
          lightness: this.props.lightness
      };
      newState[slider] = value;
      newState.type = slider;
      this.props.onStateChange(newState);
  };

  render () {
      var themedSlider;
      if (this.props.theme === "dark") {
          themedSlider = themedSliderDark;
      } else {
          themedSlider = themedSliderLight;
      }
    return (
      <section className={themedSlider.wrapper}>
        <p className={themedSlider.sliderLabel} >Hue</p>
        <Slider min={0} max={360} step={1} editable value={this.props.hue} onChange={this.handleChange.bind(this, 'hue')} theme={themedSlider} />
        <p className={themedSlider.sliderLabel} >Saturation</p>
        <Slider min={0} max={100} step={1} editable value={this.props.saturation} onChange={this.handleChange.bind(this, 'saturation')} theme={themedSlider} />
        <p className={themedSlider.sliderLabel} >Lightness</p>
        <Slider min={0} max={100} step={1} editable value={this.props.lightness} onChange={this.handleChange.bind(this, 'lightness')} theme={themedSlider} />
      </section>
    );
  }
}

export default Sliders;
