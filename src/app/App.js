import React from 'react';
import Main from './theme/main';
import ColourHelper from './helper/colourHelper';
import UtilsHelper from './helper/utilsHelper';
import Inputs from './containers/Input';
import Sliders from './containers/Slider';
import Header from './containers/Header';
import GithubLink from './containers/GithubLink';
import ButtonBar from './containers/ButtonBar';
import Nav from './containers/Nav';
import GooeySvg from './components/gooey-nav/gooeySvg';
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
            isOpen: false,
            isHandheld: false
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

    handleResizeChange = () => {
        this.setState({...UtilsHelper.getScreenSize()});
    }

    componentWillMount() {
        window.addEventListener("resize", this.handleResizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResizeChange);
    }

    render() {
        const { header:{ anchor, image }, features, inputs, sliders } = config;
        const { fullPage: fullPageClasses, header: headerClasses, centerControls: centerControlsClasses, buttonBar: buttonBarClasses } = Main;
        const { rgb, hex, theme, hue, hexOpacity, rgbOpacity, saturation, lightness, bgColour, isOpen, isHandheld } = this.state;

        let getNavigation = () => {
            if (isHandheld) {
                return <ButtonBar {...{ hex, features, buttonBarClasses }} onStateChange={this.handleStateChange} />;
            } else {
                return <Nav {...{ hex, features, isOpen }} onStateChange={this.handleStateChange} />
            }
        }

        return (
            <div className={fullPageClasses} style={{backgroundColor: `#${bgColour}`}}>
                <Header {...{ anchor, image, headerClasses }} />
                <GithubLink {...{theme, bgColour}}/>

                <div className={centerControlsClasses}>
                    <Inputs
                      {...{rgb, hex, theme, hexOpacity, rgbOpacity, inputs}}
                      onStateChange={this.handleStateChange} />

                    <Sliders
                      {...{rgb, hex, theme, hue, saturation, lightness, sliders}}
                      onStateChange={this.handleStateChange} />
                </div>

                {getNavigation()}

                <GooeySvg id="gooey-nav-svgs" />

            </div>
        );
    }
}
