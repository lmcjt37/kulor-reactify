import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
proxyquire.noCallThru();

const MainSpy = sinon.spy(),
    ColourHelperSpy = sinon.spy(),
    InputsSpy = sinon.spy(),
    SlidersSpy = sinon.spy(),
    HeaderSpy = sinon.spy(),
    configSpy = sinon.stub().returns({anchor: {}, image: {}});

const App = proxyquire('../../src/app/App.js', {
    './theme/main.scss': MainSpy,
    './helper/colourHelper.js': ColourHelperSpy,
    './containers/Input.js': InputsSpy,
    './containers/Slider.js': SlidersSpy,
    './containers/Header.js': HeaderSpy,
    './config': configSpy
}).default;

describe("Tests for app.js", function() {

    beforeEach(function () {
        this.state = {
            rgb: '91,50,86',
            hex: '5B3256',
            hue: 0,
            rgbOpacity: 1,
            hexOpacity: 1,
            saturation: 0,
            lightness: 0,
            type: '',
            theme: 'light',
            bgColour: '5B3256'
        };
    });

    it("checks correct setup of initial page", function() {
        const wrapper = shallow(<App />);

        expect(wrapper.type()).to.equal('div');

        console.log(wrapper.prop('style'));

        expect(wrapper.prop('style')).to.equal({ backgroundColor: '#5B3256' });

    });

});
