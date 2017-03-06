import React from 'react';
import Main from './theme/main';
import ColourHelper from './helper/colourHelper';
import Inputs from './containers/Input';
import Sliders from './containers/Slider';
import Header from './containers/Header';
import GithubLink from './containers/GithubLink';
import ButtonBar from './containers/ButtonBar';
import Hints from './containers/Hints';
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
            isDialogActive: false
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
        const { header:{ anchor, image }, features, inputs, sliders, dialogs } = config;
        const { fullPage: fullPageClasses, header: headerClasses, centerControls: centerControlsClasses, buttonBar: buttonBarClasses } = Main;
        const { rgb, hex, theme, hue, hexOpacity, rgbOpacity, saturation, lightness, bgColour, isDialogActive } = this.state;

        return (
            <div className={ fullPageClasses } style={{backgroundColor: `#${bgColour}`}}>
                <Header {...{ anchor, image, headerClasses }} />
                
                <GithubLink {...{ theme, bgColour }}/>

                <div className={ centerControlsClasses }>
                    <Inputs
                      {...{ rgb, hex, theme, hexOpacity, rgbOpacity, inputs }}
                      onStateChange={ this.handleStateChange } />

                    <Sliders
                      {...{ rgb, hex, theme, hue, saturation, lightness, sliders }}
                      onStateChange={ this.handleStateChange } />
                </div>

                <ButtonBar {...{ hex, features, buttonBarClasses, theme }}
                    onStateChange={ this.handleStateChange } />

                <Hints {...{ dialogs, isDialogActive }}
                    onStateChange={ this.handleStateChange } />
            </div>
        );
    }
}
