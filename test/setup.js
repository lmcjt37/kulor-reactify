const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {

    if (typeof global[property] === 'undefined') {

        exposedProperties.push(property);

        global[property] = document.defaultView[property];

    }

});

global.navigator = {
    userAgent: 'node.js'
};

global.chai = require('chai');
global.chai.use(require('chai-as-promised'));
global.should = chai.should();
global.expect = chai.expect;
global.assert = chai.assert;
