import React from 'react';
import Main from './theme/main.scss';

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
            lightness: 0
        };
    }

    handleStateChange = (data) => {
        this.setState(data);
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
