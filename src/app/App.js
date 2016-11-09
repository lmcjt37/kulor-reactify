import React from 'react';
import Main from './theme/main.scss';

import Inputs from './components/Input.js';
import Sliders from './components/Slider.js';
import Header from './components/Header.js';

const App = React.createClass({
    getInitialState: function() {
        return {
            rgb: '',
            hex: '',
            hue: 0,
            saturation: 0,
            lightness: 0
        };
    },

    handleInputStateChange: (data) => {
        console.log("inputs --> " + JSON.stringify(data));
        // this.setState({...this.state,
        //     rgb: data.rgb,
        //     hex: data.hex
        // });
    },

    handleSliderStateChange: (data) => {
        console.log("sliders --> " + JSON.stringify(data));
        // this.setState({...this.state,
        //     hue: data.hue,
        //     saturation: data.saturation,
        //     lightness: data.lightness
        // });
    },

    render() {
        return (
            <div className={Main.fullPage}>
                <Header />
                <div className={Main.centerControls}>
                    <Inputs onInputStateChange={this.handleInputStateChange}/>
                    <Sliders onSliderStateChange={this.handleSliderStateChange}/>
                </div>
            </div>
        )
    }
});

export default App;
