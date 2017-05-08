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

    describe("and handles button functions when clicked, for", () => {

        let spy;

        beforeEach(() => {

            spy = sinon.spy();

        });

        afterEach(() => {

            spy.reset();

        });

        it("randomise", () => {

            spy(ColourHelper.randomise());

            sinon.assert.calledWith(spy, sinon.match.has("rgb", sinon.match.string)
                .and(sinon.match.has("hex", sinon.match.string))
                .and(sinon.match.has("hue", sinon.match.number))
                .and(sinon.match.has("rgbOpacity", sinon.match.number))
                .and(sinon.match.has("hexOpacity", sinon.match.number))
                .and(sinon.match.has("saturation", sinon.match.number))
                .and(sinon.match.has("lightness", sinon.match.number))
                .and(sinon.match.has("alpha", sinon.match.number))
                .and(sinon.match.has("theme", sinon.match.string))
                .and(sinon.match.has("bgColour", sinon.match.string))
            );

        });

        it("lighten", () => {

            spy(ColourHelper.lighten("5b3256"));

            sinon.assert.calledWith(spy, sinon.match.has("rgb", "124,68,117")
                .and(sinon.match.has("hex", "7c4475"))
                .and(sinon.match.has("hue", 307))
                .and(sinon.match.has("rgbOpacity", sinon.match.number))
                .and(sinon.match.has("hexOpacity", sinon.match.number))
                .and(sinon.match.has("saturation", 29))
                .and(sinon.match.has("lightness", 38))
                .and(sinon.match.has("alpha", sinon.match.number))
                .and(sinon.match.has("theme", "light"))
                .and(sinon.match.has("bgColour", "124,68,117,1.0"))
            );

        });

        it("darken", () => {

            spy(ColourHelper.darken("5b3256"));

            sinon.assert.calledWith(spy, sinon.match.has("rgb", "58,32,55")
                .and(sinon.match.has("hex", "3a2037"))
                .and(sinon.match.has("hue", 307))
                .and(sinon.match.has("rgbOpacity", sinon.match.number))
                .and(sinon.match.has("hexOpacity", sinon.match.number))
                .and(sinon.match.has("saturation", 29))
                .and(sinon.match.has("lightness", 18))
                .and(sinon.match.has("alpha", sinon.match.number))
                .and(sinon.match.has("theme", "light"))
                .and(sinon.match.has("bgColour", "58,32,55,1.0"))
            );

        });

    });

    describe("and trims correctly, for", () => {

        it("rgb", () => {

            expect(ColourHelper.trimRgb("123 123 123")).to.equal("123,123,123");

            // bug identified here
            // This is a bug where 3 characters allows the fullstop and 2 characters doesn't
            expect(ColourHelper.trimRgb("123.")).to.equal("123,.");

            expect(ColourHelper.trimRgb("rgb(123,123,123)")).to.equal("123,123,123");

            // bug identified here
            // not excluding all unwanted characters
            // expect(ColourHelper.trimRgb("rgba(123,123,123)")).to.equal("123,123,123");

            expect(ColourHelper.trimRgb(",")).to.equal("");

            // bug identified here
            // shouldn't allow initial fullstop
            // expect(ColourHelper.trimRgb(".")).to.equal("");

            expect(ColourHelper.trimRgb("123,123,123,0.9,")).to.equal("123,123,123,0.9");

            expect(ColourHelper.trimRgb("123,123,123,1.")).to.equal("123,123,123,1");

            expect(ColourHelper.trimRgb("123,123,123,,")).to.equal("123,123,123,");

            // bug identified here
            // shouldn't allow initial space or replace space with comma
            // expect(ColourHelper.trimRgb(" ")).to.equal(",");

            expect(ColourHelper.trimRgb("1231")).to.equal("123,1");

            expect(ColourHelper.trimRgb("123,1231")).to.equal("123,123,1");

            expect(ColourHelper.trimRgb("123,123,1230")).to.equal("123,123,123,0");

            expect(ColourHelper.trimRgb("256")).to.equal("25");

            expect(ColourHelper.trimRgb("255,256")).to.equal("255,25");

            expect(ColourHelper.trimRgb("255,255,256")).to.equal("255,255,25");

            // bug identified here
            // zeros shouldn't be allowed in first 3 sections
            // expect(ColourHelper.trimRgb("255,255,0")).to.equal("255,255,0");

        });

        it("hex", () => {

            expect(ColourHelper.trimHex("5b3256")).to.equal("5b3256");

            expect(ColourHelper.trimHex("#5b3256")).to.equal("5b3256");

            expect(ColourHelper.trimHex("5b3256cc")).to.equal("5b3256cc");

            expect(ColourHelper.trimHex("5b3256cc0")).to.equal("5b3256cc");

            expect(ColourHelper.trimHex("ghijklmnopqrstuvwxyz")).to.equal("");

        });

    });

});
