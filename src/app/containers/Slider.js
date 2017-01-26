import React from 'react';
import Slider from '../components/FormSlider';

import themedSliderLight from '../theme/themedSliderLight.scss';
import themedSliderDark from '../theme/themedSliderDark.scss';

class Sliders extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange = (slider, value) => {
        const {hue, saturation, lightness, onStateChange} = this.props;

        onStateChange({
            hue,
            saturation,
            lightness,
            [slider]: value,
            type: slider
        });
    };

    getSliderTheme(theme) {
        if (theme === "dark") {
            return themedSliderDark;
        }
        return themedSliderLight;
    }

    getColourSliders(sliderTheme) {
        return [
          {
            type: 'hue',
            min: 0,
            max: 360,
            step: 1
          },
          {
            type: 'saturation',
            min: 0,
            max: 100,
            step: 1
          },
          {
            type: 'lightness',
            min: 0,
            max: 360,
            step: 1
          }
        ].map(({type, min, max, step}) => (
            <Slider
              key={type}
              {...{min, max, step}}
              editable
              label={`${type.charAt(0).toUpperCase()}${type.slice(1)}`}
              value={this.props[type]}
              onChange={this.handleChange.bind(this, type)}
              theme={sliderTheme}
            />
        ));
    }

    render () {
        const sliderTheme = this.getSliderTheme(this.props.theme);

        return (
              <section className={sliderTheme['wrapper']}>
                 {this.getColourSliders(this.getSliderTheme(sliderTheme))}
              </section>
        );
    }
}

export default Sliders;
