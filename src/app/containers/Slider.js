import React from 'react';
import Slider from '../components/FormSlider';
import themedSliderLight from '../theme/themedSliderLight';
import themedSliderDark from '../theme/themedSliderDark';

export default class Sliders extends React.Component {

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
        const array = [];
        for (var prop in this.props.sliders) {
            array.push(prop);
        }
        return array.map(type => (
            <Slider
              key={type}
              {...this.props.sliders[type]}
              editable
              label={`${type.charAt(0).toUpperCase()}${type.slice(1)}`}
              value={this.props[type]}
              onChange={this.handleChange.bind(this, type)}
              theme={sliderTheme} />
        ));
    }

    render () {
        const sliderTheme = this.getSliderTheme(this.props.theme);

        return (
              <section className={sliderTheme['wrapper']}>
                 {this.getColourSliders(sliderTheme)}
              </section>
        );
    }
}
