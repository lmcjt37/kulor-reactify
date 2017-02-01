import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import App from '../../src/app/App';

describe("Tests for app.js",() => {

    beforeEach(() => {});

    it("checks correct setup of initial page", () => {
        const wrapper = shallow(<App />);

        expect(wrapper.type()).to.equal('div');

        // assertion incorrect ???
        // expect(wrapper.prop('style')).to.equal({ backgroundColor: '#5B3256' });

    });

});
