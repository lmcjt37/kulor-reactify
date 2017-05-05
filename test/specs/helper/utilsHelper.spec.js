import React from 'react';
import sinon from 'sinon';

import UtilsHelper from "helper/utilsHelper";

describe("Tests for helper/utilsHelper.js", () => {

    describe("and it's sizing functions, of", () => {

        it("getScreenWidth", () => {

            window.innerWidth = 1000;

            expect(UtilsHelper.getScreenWidth()).to.equal(1000);

        });

        it("getScreenHeight", () => {

            window.innerHeight = 500;

            expect(UtilsHelper.getScreenHeight()).to.equal(500);

        });

    });

    describe("and getScreenSize, when", () => {

        beforeEach(() => {

            sinon.stub(UtilsHelper, 'getScreenWidth');

        });

        afterEach(() => {

            UtilsHelper.getScreenWidth.restore();

        });

        it("width > 768", () => {

            UtilsHelper.getScreenWidth.returns(800);

            expect(UtilsHelper.getScreenSize()).to.deep.equal({ isHandheld: false, rgbOpacity: 1, hexOpacity: 1 });

        });

        it("width < 768 && width > 481", () => {

            UtilsHelper.getScreenWidth.returns(600);

            expect(UtilsHelper.getScreenSize()).to.deep.equal({ isHandheld: true, rgbOpacity: 1, hexOpacity: 1 });

        });

        it("width < 768 && width < 481", () => {

            UtilsHelper.getScreenWidth.returns(400);

            expect(UtilsHelper.getScreenSize()).to.deep.equal({ isHandheld: true, rgbOpacity: 0, hexOpacity: 0 });

        });

    });

});
