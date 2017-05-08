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

        it("randomise", () => {

            let spy = sinon.spy();
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

            let spy = sinon.spy();
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

            let spy = sinon.spy();
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

});
