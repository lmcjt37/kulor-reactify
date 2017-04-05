/* Remember: https://mochajs.org/#arrow-functions*/
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import App from '../../src/app/App';

describe("Tests for app.js",() => {

    beforeEach(() => {});

    afterEach(() => {});

    describe("and we check initial", () => {

        it("state object", () => {

            const wrapper = mount(<App />);

            expect(wrapper.node.state).to.deep.equal({
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
                bgColour: '5b3256',
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

            expect(wrapper.prop('style')).to.deep.equal({ backgroundColor: '#5b3256' });

        });

    });

});
