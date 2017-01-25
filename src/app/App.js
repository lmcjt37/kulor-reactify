import React from 'react';
import Main from './theme/main.scss';
import ColourHelper from './helper/colourHelper.js';

import Inputs from './containers/Input.js';
import Sliders from './containers/Slider.js';
import Header from './containers/Header.js';
import config from './config';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rgb: '',
            hex: '',
            hue: 0,
            saturation: 0,
            lightness: 0,
            type: "",
            theme: "light",
            bgColour: "5B3256"
        };
    }

    handleFocusOfOtherElement = (name) => {
        var otherEl = (name === "rgb") ? "hex" : "rgb";
        var elements = document.querySelectorAll('[data-ref=' + otherEl + ']')[0].getElementsByTagName("p");
        for(var i = 0; i < elements.length; i++) {
                elements[i].style.opacity = 1;
        }
    }

    handleStateChange = (data) => {
        if (ColourHelper.validateColours(data)) {
            this.setState(ColourHelper.convertColours(data));
            this.handleFocusOfOtherElement(data.type);
        } else {
            this.setState(data);
        }
    }

    render() {
        const {header:{anchor, image}} = config;
        const {fullPage: fullPageClasses, header: headerClasses, centerControls: centerControlsClasses} = Main;
        const {rgb, hex, theme} = this.state;

        return (
            <div className={fullPageClasses} style={{backgroundColor: "#" + this.state.bgColour }}>
                <Header
                  {...{anchor, image, headerClasses}}/>
                <div className={centerControlsClasses}>
                    <Inputs
                      {...{rgb, hex, theme}}
                      onStateChange={this.handleStateChange.bind(this)}/>
                    <Sliders {...this.state} onStateChange={this.handleStateChange.bind(this)}/>
                </div>
            </div>
        )
    }
};

export default App;
