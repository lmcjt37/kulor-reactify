import React from 'react';
import { mount, render, shallow } from 'enzyme';
import sinon from 'sinon';

import App from '../../src/app/App';

describe("Tests for app.js",() => {

    beforeEach(() => {});

    it("checks correct setup of initial page", () => {
        const wrappers = shallow(<App />);
        const wrapperr = render(<App />);
        const wrapperm = mount(<App />);

        console.log("==========");
        console.log(wrappers);
        console.log("==========");
        console.log(wrapperr);
        console.log("==========");
        console.log(wrapperm);

        // expect(wrapper.type()).to.equal('div');

        // expect(wrapper.prop('style')).to.deep.equal({ backgroundColor: '#5B3256' });

        // console.log(wrapper.props().children);

    });

});
