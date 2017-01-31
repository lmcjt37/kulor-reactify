
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import App from '../src/app/App';

describe("Tests for app.js", function() {

  it("checks correct setup of initial page", function() {
      expect(shallow(<App />).contains(<Header />)).to.equal(true);
      expect(shallow(<App />).contains(<Inputs />)).to.equal(true);
      expect(shallow(<App />).contains(<Sliders />)).to.equal(true);
  });

});
