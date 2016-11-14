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
            rgb: '',
            hex: '',
            hue: 0,
            saturation: 0,
            lightness: 0,
            type: ""
        };
    }

    handleStateChange = (data) => {
        this.setState(data);
        
        if (ColourHelper.validateColours(data)) {
            console.log(ColourHelper.convertColours(data));
        }
    }

    render() {
        return (
            <div className={Main.fullPage}>
                <Header />
                <div className={Main.centerControls}>
                    <Inputs onStateChange={this.handleStateChange}/>
                    <Sliders onStateChange={this.handleStateChange}/>
                </div>
            </div>
        )
    }
};

export default App;
