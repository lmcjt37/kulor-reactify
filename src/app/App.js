import React from 'react';
import Main from './theme/main.scss';
import ColourHelper from './helper/colourHelper.js';

import Inputs from './containers/Input.js';
import Sliders from './containers/Slider.js';
import Header from './containers/Header.js';
import Nav from './containers/Nav.js';
import config from './config';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rgb: '91,50,86',
            hex: '5B3256',
            hue: 307,
            rgbOpacity: 1,
            hexOpacity: 1,
            saturation: 29,
            lightness: 28,
            type: '',
            theme: 'light',
            bgColour: '5B3256',
            isOpen: false
        };
    }


    handleStateChange = (data) => {
        if (ColourHelper.validateColours(data)) {
            this.setState({
                ...ColourHelper.convertColours(data),
                rgbOpacity: 1,
                hexOpacity: 1
            });
        } else {
            this.setState({
                ...data
            });
        }
    }

    render() {
        const { header:{ anchor, image }, features: features } = config;
        const { fullPage: fullPageClasses, header: headerClasses, centerControls: centerControlsClasses, buttonBar: buttonBarClasses } = Main;
        const { rgb, hex, theme, hue, hexOpacity, rgbOpacity, saturation, lightness, isOpen } = this.state;

        return (
            <div className={fullPageClasses} style={{backgroundColor: `#${this.state.bgColour}`}}>
                <Header {...{ anchor, image, headerClasses }} />

                <div className={centerControlsClasses}>
                    <Inputs
                      {...{rgb, hex, theme, hexOpacity, rgbOpacity}}
                      onStateChange={this.handleStateChange} />

                    <Sliders
                      {...{rgb, hex, theme, hue, saturation, lightness}}
                      onStateChange={this.handleStateChange} />
                </div>

                <Nav {...{ hex, features, isOpen }}
                    onStateChange={this.handleStateChange} />
            </div>
        );
    }
}
