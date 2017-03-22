import React from 'react';

import ColourHelper from './helper/colourHelper';
import UtilsHelper from './helper/utilsHelper';

import Inputs from './containers/Input';
import Sliders from './containers/Slider';
import Header from './containers/Header';
import GithubLink from './containers/GithubLink';
import ButtonBar from './containers/ButtonBar';
import Nav from './containers/Nav';
import Hints from './containers/Hints';
import Toast from './containers/Toast';

import GooeySvg from './components/gooey-nav/gooeySvg';
import IconButton from './components/IconButton';

import Main from './theme/main';
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
            isHandheld: null,
            isDialogActive: false,
            showToast: false,
            toastMessage: ''
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

    componentDidMount() {
        this.handleResizeChange();
    }

    componentWillMount() {
        window.addEventListener("resize", this.handleResizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResizeChange);
    }

    render() {
        const { header:{ anchor, image }, features, inputs, sliders, dialogs } = config;
        const { fullPage: fullPageClasses, header: headerClasses, centerControls: centerControlsClasses, buttonBar: buttonBarClasses, helpHints: helpHintsClasses } = Main;
        const { rgb, hex, theme, hue, hexOpacity, rgbOpacity, saturation, lightness, bgColour, isOpen, isHandheld, isDialogActive, showToast, toastMessage } = this.state;

        let getNavigation = () => {
            if (isHandheld) {
                return <ButtonBar {...{ hex, features, buttonBarClasses }} onStateChange={this.handleStateChange} />;
            } else {
                return <Nav {...{ hex, features, isOpen }} onStateChange={this.handleStateChange} />
            }
        }

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

                {getNavigation()}

                <div className={ helpHintsClasses }>
                    <IconButton
                        icon='help_outline'
                        inverse={ theme === "light" }
                        onMouseUp={ () => this.handleStateChange({ isDialogActive: true }) }
                    />
                </div>

                <Hints {...{ dialogs, isDialogActive }}
                    onStateChange={ this.handleStateChange } />

                <Toast {...{ showToast, toastMessage }}
                    onStateChange={ this.handleStateChange } />

                {/* Adds filters to the DOM for gooey navigation */}
                <GooeySvg id="gooey-nav-svgs" />
            </div>
        );
    }
}
