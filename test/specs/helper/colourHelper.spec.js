import React from 'react';
import sinon from 'sinon';

import ColourHelper from "helper/colourHelper";

describe("Tests for helper/colourHelper.js", () => {

    describe("and validates colours as true for", () => {

        it("rgb", () => {

            expect(ColourHelper.validateColours({ rgb: '91,50,86', hex: '5b3256', type: "rgb" })).to.equal(true);

        });

        it("hex", () => {

            expect(ColourHelper.validateColours({ rgb: '91,50,86', hex: '5b3256', type: "hex" })).to.equal(true);

        });

        it("hue", () => {

            expect(ColourHelper.validateColours({ rgb: '91,50,86', hex: '5b3256', type: "hue" })).to.equal(true);

        });

        it("saturation", () => {

            expect(ColourHelper.validateColours({ rgb: '91,50,86', hex: '5b3256', type: "saturation" })).to.equal(true);

        });

        it("lightness", () => {

            expect(ColourHelper.validateColours({ rgb: '91,50,86', hex: '5b3256', type: "lightness" })).to.equal(true);

        });

        it("alpha", () => {

            expect(ColourHelper.validateColours({ rgb: '91,50,86', hex: '5b3256', type: "alpha" })).to.equal(true);

        });

    });

    describe("and validates colours as false for", () => {

        it("default", () => {

            expect(ColourHelper.validateColours({ rgb: '91,50,86', hex: '5b3256', type: "default" })).to.equal(false);

        });

        it("incorrect hex length", () => {

            expect(ColourHelper.validateColours({ rgb: '91,50,86', hex: '5b32565b3256', type: "default" })).to.equal(false);

        });

        it("non match against rgb pattern", () => {

            expect(ColourHelper.validateColours({ rgb: '333,666,999', hex: '5b3256', type: "default" })).to.equal(false);

        });

    });

    // describe("and getScreenSize, when", () => {
    //
    //     beforeEach(() => {
    //
    //         sinon.stub(UtilsHelper, 'getScreenWidth');
    //
    //     });
    //
    //     afterEach(() => {
    //
    //         UtilsHelper.getScreenWidth.restore();
    //
    //     });
    //
    //     it("width > 768", () => {
    //
    //         UtilsHelper.getScreenWidth.returns(800);
    //
    //         expect(UtilsHelper.getScreenSize()).to.deep.equal({ isHandheld: false, rgbOpacity: 1, hexOpacity: 1 });
    //
    //     });
    //
    //     it("width < 768 && width > 481", () => {
    //
    //         UtilsHelper.getScreenWidth.returns(600);
    //
    //         expect(UtilsHelper.getScreenSize()).to.deep.equal({ isHandheld: true, rgbOpacity: 1, hexOpacity: 1 });
    //
    //     });
    //
    //     it("width < 768 && width < 481", () => {
    //
    //         UtilsHelper.getScreenWidth.returns(400);
    //
    //         expect(UtilsHelper.getScreenSize()).to.deep.equal({ isHandheld: true, rgbOpacity: 0, hexOpacity: 0 });
    //
    //     });
    //
    // });

});
