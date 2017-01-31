
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import App from '../../src/app/App.js';

describe("Tests for app.js", function() {

  it("checks correct setup of initial page", function() {
      const wrapper = shallow(<App />);

      expect(wrapper.find('Header')).to.have.length(1);
      expect(wrapper.find('Inputs')).to.have.length(1);
      expect(wrapper.find('Sliders')).to.have.length(1);

  });

});
