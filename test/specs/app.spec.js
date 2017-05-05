/* Remember: https://mochajs.org/#arrow-functions*/
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import UtilsHelper from "helper/utilsHelper";
import App from 'App';
import Header from 'containers/Header';
import GithubLink from 'containers/GithubLink';
import ButtonBar from 'containers/ButtonBar';
import Hints from 'containers/Hints';
import Inputs from 'containers/Input';
import Nav from 'containers/Nav';
import Sliders from 'containers/Slider';
import Toast from 'containers/Toast';

describe("Tests for app.js", () => {

    describe("and we check initial", () => {

        it("state object", () => {

            const wrapper = mount(<App />);

            expect(wrapper.state()).to.deep.equal({
                rgb: '91,50,86',
                hex: '5b3256',
                hue: 307,
                rgbOpacity: 1,
                hexOpacity: 1,
                saturation: 29,
                lightness: 28,
                alpha: 1,
                type: '',
                theme: 'light',
                bgColour: '91,50,86,1.0',
                isOpen: false,
                isHandheld: false,
                isDialogActive: false,
                showToast: false,
                toastMessage: ''
            });

        });

        it("root element", () => {

            const wrapper = shallow(<App />);

            expect(wrapper.type()).to.equal('div');

            expect(wrapper.prop('style')).to.deep.equal({ backgroundColor: 'rgba(91,50,86,1.0)' });

            expect(wrapper.find(ButtonBar)).to.have.lengthOf(0);

            expect(wrapper.find(GithubLink)).to.have.lengthOf(1);

            expect(wrapper.find(Header)).to.have.lengthOf(1);

            expect(wrapper.find(Hints)).to.have.lengthOf(1);

            expect(wrapper.find(Inputs)).to.have.lengthOf(1);

            expect(wrapper.find(Nav)).to.have.lengthOf(1);

            expect(wrapper.find(Sliders)).to.have.lengthOf(1);

            expect(wrapper.find(Toast)).to.have.lengthOf(1);

        });

    });

    describe("and we check function", () => {

        let wrapper, instance;

        beforeEach(() => {

            wrapper = mount(<App />);

            instance = wrapper.instance();

            sinon.spy(instance, 'handleResizeChange');

            sinon.stub(UtilsHelper, 'getScreenSize');

        });

        afterEach(() => {

            UtilsHelper.getScreenSize.restore();

            instance.handleResizeChange.restore();

        });

        it("handleResizeChange - small device", () => {

            UtilsHelper.getScreenSize.returns({ isHandheld: true });

            instance.handleResizeChange();

            expect(instance.handleResizeChange.calledOnce).to.equal(true);

            expect(wrapper.state()).to.deep.equal({
                rgb: '91,50,86',
                hex: '5b3256',
                hue: 307,
                rgbOpacity: 1,
                hexOpacity: 1,
                saturation: 29,
                lightness: 28,
                alpha: 1,
                type: '',
                theme: 'light',
                bgColour: '91,50,86,1.0',
                isOpen: false,
                isHandheld: true,
                isDialogActive: false,
                showToast: false,
                toastMessage: ''
            });

            wrapper.update();

            expect(wrapper.find(ButtonBar)).to.have.lengthOf(1);

            expect(wrapper.find(Nav)).to.have.lengthOf(0);

        });

        it("handleResizeChange - large device", () => {

            UtilsHelper.getScreenSize.returns({ isHandheld: false });

            instance.handleResizeChange();

            expect(instance.handleResizeChange.calledOnce).to.equal(true);

            expect(wrapper.state()).to.deep.equal({
                rgb: '91,50,86',
                hex: '5b3256',
                hue: 307,
                rgbOpacity: 1,
                hexOpacity: 1,
                saturation: 29,
                lightness: 28,
                alpha: 1,
                type: '',
                theme: 'light',
                bgColour: '91,50,86,1.0',
                isOpen: false,
                isHandheld: false,
                isDialogActive: false,
                showToast: false,
                toastMessage: ''
            });

        });

    });

});
