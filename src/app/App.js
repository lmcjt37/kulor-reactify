import React from 'react';
import Main from './theme/main.scss';
import ColourHelper from './helper/colourHelper.js';

import Inputs from './components/Input.js';
import Sliders from './components/Slider.js';
import Header from './components/Header.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rgb: '91,50,86',
            hex: '5B3256',
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
        return (
            <div className={Main.fullPage} style={{backgroundColor: "#" + this.state.bgColour }}>
                <Header />
                <div className={Main.centerControls}>
                    <Inputs {...this.state} onStateChange={this.handleStateChange.bind(this)}/>
                    <Sliders {...this.state} onStateChange={this.handleStateChange.bind(this)}/>
                </div>
            </div>
        )
    }
};

export default App;
