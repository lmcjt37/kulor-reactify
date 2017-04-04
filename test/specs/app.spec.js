import React from 'react';
import { mount, render, shallow } from 'enzyme';
import sinon from 'sinon';

import App from '../../src/app/App';

describe("Tests for app.js",() => {

    beforeEach(() => {});

    it("checks correct setup of initial page", () => {
        
        const wrapper = shallow(<App />);

        expect(wrapper.type()).to.equal('div');

        expect(wrapper.prop('style')).to.deep.equal({ backgroundColor: '#5b3256' });

    });

});
