import React from 'react';
import {
	findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from '../../src/app/App.js';

describe("Tests for app.js", function() {

    it("checks correct setup of initial page", function() {
        const component = shallow(<App />);

        expect(findRenderedDOMComponentWithTag(component, 'Header')).to.be.ok;
        expect(findRenderedDOMComponentWithTag(component, 'Inputs')).to.be.ok;
        expect(findRenderedDOMComponentWithTag(component, 'Sliders')).to.be.ok;

    });

});
