const tinycolor = require("tinycolor2");
let helper = {};

const parseRgb = (rgb, type) => {
    switch(type) {
        case "object":
            let tmp = helper.trimRgb(rgb);
            if (rgb.indexOf(",") > -1) {
                tmp = tmp.split(",");
            } else {
                tmp = tmp.split(" ");
            }
            return {
                r: tmp[0],
                g: tmp[1],
                b: tmp[2]
            };
        case "string":
            return rgb.r + "," + rgb.g + "," + rgb.b;
    }
};

const parseDecimal = (dec) => {
    if (dec > 1) {
        return Math.round(dec.toFixed(2));
    } else {
        return Math.round((dec.toFixed(2)) * 100);
    }
};

const objectifyHsl = (data) => {
    return {
        h: data.hue,
        s: data.saturation,
        l: data.lightness
    };
};

const convertRgb = (data) => {
    let rgb = parseRgb(data.rgb, "object");
    return {
        "rgb": parseRgb(rgb, "string"),
        "hex": tinycolor(rgb).toHex(),
        "hue": parseDecimal(tinycolor(rgb).toHsl()["h"]),
        "saturation": parseDecimal(tinycolor(rgb).toHsl()["s"]),
        "lightness": parseDecimal(tinycolor(rgb).toHsl()["l"]),
        "theme": tinycolor(rgb).isDark() ? "light" : "dark",
        "bgColour": tinycolor(rgb).toHex()
    };
};

const convertHex = (data) => {
    return {
        "rgb": parseRgb(tinycolor(data.hex).toRgb(), "string"),
        "hex": data.hex,
        "hue": parseDecimal(tinycolor(data.hex).toHsl()["h"]),
        "saturation": parseDecimal(tinycolor(data.hex).toHsl()["s"]),
        "lightness": parseDecimal(tinycolor(data.hex).toHsl()["l"]),
        "theme": tinycolor(data.hex).isDark() ? "light" : "dark",
        "bgColour": data.hex
    };
}

const convertHsl = (data) => {
    let hsl = objectifyHsl(data);
    return {
        "rgb": parseRgb(tinycolor(hsl).toRgb(), "string"),
        "hex": tinycolor(hsl).toHex(),
        "hue": data.hue,
        "saturation": data.saturation,
        "lightness": data.lightness,
        "theme": tinycolor(hsl).isDark() ? "light" : "dark",
        "bgColour": tinycolor(hsl).toHex()
    };
};

const getColourObject = (color) => ({
    "rgb": parseRgb(color.toRgb(), "string"),
    "hex": color.toHex(),
    "hue": parseDecimal(color.toHsl()["h"]),
    "rgbOpacity": 1,
    "hexOpacity": 1,
    "saturation": parseDecimal(color.toHsl()["s"]),
    "lightness": parseDecimal(color.toHsl()["l"]),
    "theme": color.isDark() ? "light" : "dark",
    "bgColour": color.toHex()
});

helper = {

    validateRgb: (rgb) => {
        return rgb.match(/^(\d+\,\s*\d+\,\s*\d+)$|^(\s*\d{1,3}\s\d{1,3}\s\d{1,3})$/gim) !== null;
    },

    validateHex: (hex) => {
        if (hex.length === 3 || hex.length === 6) {
            return true;
        }
        return false;
    },

    validateColours({type, rgb, hex}) {
        switch (type) {
            case "rgb":
                return helper.validateRgb(rgb);
                break;
            case "hex":
                return helper.validateHex(hex);
                break;
            case "hue":
            case "saturation":
            case "lightness":
                /**
                * no validation - constrained and always returned as String
                */
                return true;
                break;
            default:
                return false;
        }
    },

    trimRgb: (colour) => {
        let tmp = JSON.stringify(colour);
        //replaces space delimatation with commas
        if (tmp.indexOf(",") === -1) {
            tmp = tmp.replace(/\s/g, ",");
        }
        tmp = tmp.replace(/[^\w\,\.]|[rgb]/g, "");
        let count = 0;
        // prevents extra commas
        if (tmp.substring(11, 12) === ",") {
            tmp = tmp.substring(0, 11);
        }
        // trims space (if exists) from conversion
        if (tmp.substring(0, 1) === " ") {
            tmp = tmp.substring(1);
        }
        // strips commas to get raw count
        count = tmp.replace(/,/g, "").length;
        // adds missing commas dynamically
        let arr = tmp.split("");
        let commaCount = 0;
        let inc = 0;
        arr.forEach((chr, idx) => {
            inc++;
            if (commaCount < 2) {
                if(chr === ",") {
                    commaCount++;
                    inc = 0;
                }
                if (inc > 3 && chr !== ",") {
                    tmp = tmp.substring(0,idx) + "," + tmp.substring(idx);
                    inc = 0;
                }
            }
        });

        if (count >= 10) {
            // sets limit to 11 with commas
            return tmp.substring(0, 11);
        } else if (tmp.match(/,/g).length >=2 && tmp.split(",")[2].length > 3) {
            // checks number of sections, capping 3rd section with 3 digits
            return tmp.substring(0, tmp.length-1);
        } else {
            return tmp;
        }
    },

    trimHex: (colour) => {
        let tmp = JSON.stringify(colour).replace(/[^a-fA-F0-9\s]/g, "");
        if (tmp.substring(0, 1) === "#") {
            tmp = tmp.substring(1);
        }
        if (tmp.length >= 7) {
            return tmp.substring(0, 6);
        } else {
            return tmp;
        }
    },

    convertColours: (data) => {
        switch(data.type) {
            case 'rgb':
                return convertRgb(data);
            case 'hex':
                return convertHex(data);
            case 'hue':
            case 'saturation':
            case 'lightness':
                return convertHsl(data);
        }
    },

    randomise: () => getColourObject(tinycolor.random()),

    lighten: (colour) => getColourObject(tinycolor(colour).lighten()),

    darken: (colour) => getColourObject(tinycolor(colour).darken())

};

module.exports = helper;
