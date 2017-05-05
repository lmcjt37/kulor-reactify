const tinycolor = require("tinycolor2");
let helper = {};

const parseRgb = (rgb, type, showAlpha) => {
    switch(type) {
        case "object":
            let tmp = helper.trimRgb(rgb);
            if (rgb.indexOf(",") !== -1) {
                tmp = tmp.split(",");
            } else {
                tmp = tmp.split(" ");
            }
            if (tmp[3]) {
                return {
                    r: tmp[0],
                    g: tmp[1],
                    b: tmp[2],
                    a: tmp[3]
                };
            } else {
                return {
                    r: tmp[0],
                    g: tmp[1],
                    b: tmp[2]
                };
            }
        case "string":
            if (rgb.a >= 0 && rgb.a < 1) {
                return rgb.r + "," + rgb.g + "," + rgb.b + "," + parseFloatNumber(rgb.a);
            } else if(rgb.a === 1 && showAlpha) {
                return rgb.r + "," + rgb.g + "," + rgb.b + ",1.0";
            } else {
                return rgb.r + "," + rgb.g + "," + rgb.b;
            }
    }
};

const parseDecimal = (dec) => {
    if (dec > 1) {
        return Math.round(dec.toFixed(2));
    } else {
        return Math.round((dec.toFixed(2)) * 100);
    }
};

const parseFloatNumber = (num) => {
    var val = num.toString();
    if (val.split("").length === 3) {
        return parseFloat(Math.round(num * 100) / 100).toFixed(1);
    } else {
        return parseFloat(Math.round(num * 100) / 100).toFixed(2);
    }
};

const objectifyHsl = (data) => {
    const { hue, saturation, lightness, alpha } = data;
    if (alpha === 1) {
        return {
            h: hue,
            s: saturation,
            l: lightness
        };
    } else {
        return {
            h: hue,
            s: saturation,
            l: lightness,
            a: alpha === 0 ? 0.0 : alpha
        };
    }
};

const convertRgb = (data) => {
    let rgb = parseRgb(data.rgb, "object");
    let hasAlpha = false;
    if (rgb.a >= 0 && rgb.a < 1) {
        hasAlpha = true;
    }
    return {
        "rgb": parseRgb(rgb, "string"),
        "hex": hasAlpha ? tinycolor(rgb).toHex8() : tinycolor(rgb).toHex(),
        "hue": parseDecimal(tinycolor(rgb).toHsl()["h"]),
        "saturation": parseDecimal(tinycolor(rgb).toHsl()["s"]),
        "lightness": parseDecimal(tinycolor(rgb).toHsl()["l"]),
        "alpha": tinycolor(rgb).toHsl()["a"],
        "theme": getTrueBrightnessWithAlpha(rgb) ? "light" : "dark",
        "bgColour": parseRgb(rgb, "string", true)
    };
};

const convertHex = (data) => {

    return {
        "rgb": parseRgb(tinycolor(data.hex).toRgb(), "string"),
        "hex": data.hex,
        "hue": parseDecimal(tinycolor(data.hex).toHsl()["h"]),
        "saturation": parseDecimal(tinycolor(data.hex).toHsl()["s"]),
        "lightness": parseDecimal(tinycolor(data.hex).toHsl()["l"]),
        "alpha": tinycolor(data.hex).toHsl()["a"],
        "theme": getTrueBrightnessWithAlpha(tinycolor(data.hex).toRgb()) ? "light" : "dark",
        "bgColour": parseRgb(tinycolor(data.hex).toRgb(), "string", true)
    };
}

const convertHsl = (data) => {
    let hsl = objectifyHsl(data);
    let hasAlpha = false;
    if (hsl.a >= 0 && hsl.a < 1) {
        hasAlpha = true;
    }
    return {
        "rgb": parseRgb(tinycolor(hsl).toRgb(), "string"),
        "hex": hasAlpha ? tinycolor(hsl).toHex8() : tinycolor(hsl).toHex(),
        "hue": data.hue,
        "saturation": data.saturation,
        "lightness": data.lightness,
        "alpha": data.alpha,
        "theme": getTrueBrightnessWithAlpha(tinycolor(hsl).toRgb()) ? "light" : "dark",
        "bgColour": parseRgb(tinycolor(hsl).toRgb(), "string", true)
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
    "alpha": 1.0,
    "theme": getTrueBrightnessWithAlpha(color) ? "light" : "dark",
    "bgColour": parseRgb(color.toRgb(), "string", true)
});

const getTrueBrightnessWithAlpha = (color) => {
    let old = color;
    if (typeof color !== 'object') {
        old = parseRgb(tinycolor(color).toRgb(), "object");
    }
    const newR = (old.r * old.a) + (255 * (1 - old.a));
    const newG = (old.g * old.a) + (255 * (1 - old.a));
    const newB = (old.b * old.a) + (255 * (1 - old.a));
    const colorObj = {
        r: Math.round(newR),
        g: Math.round(newG),
        b: Math.round(newB)
    };
    return tinycolor(colorObj).isDark();
}

helper = {

    validateColours({type, rgb, hex}) {
        switch (type) {
            case "rgb":
                return rgb.match(/^(\d+\,\s*\d+\,\s*\d+)$|^(\d+\,\s*\d+\,\s*\d+\,(\d\.\d))$|^(\d+\,\s*\d+\,\s*\d+\,(\d\.\d\d))$|^(\s*\d{1,3}\s\d{1,3}\s\d{1,3})$|^(\s*\d{1,3}\s\d{1,3}\s\d{1,3}\s(\d\.\d))$|^(\s*\d{1,3}\s\d{1,3}\s\d{1,3}\s(\d\.\d\d))$/gim) !== null;
            case "hex":
                if (hex.length === 3 || hex.length === 6 || hex.length === 8) {
                    return true;
                }
                return false;
            case "hue":
            case "saturation":
            case "lightness":
            case "alpha":
                /**
                * no validation - constrained and always returned as String
                */
                return true;
            default:
                return false;
        }
    },

    trimRgb: (colour) => {
        let tmp = JSON.stringify(colour);
        //remove initial comma
        tmp = tmp.replace(/^\",/g, "");
        //replaces space delimatation with commas
        if (tmp.indexOf(",") === -1) {
            tmp = tmp.replace(/\s/g, ",");
        }
        // strips unwanted characters
        tmp = tmp.replace(/[^\w\,\.]|[rgb]/g, "");
        // prevents extra commas
        if (tmp.substring(16, 17) === ",") {
            tmp = tmp.substring(0, 16);
        }
        // trims space (if exists) from conversion
        if (tmp.substring(0, 1) === " ") {
            tmp = tmp.substring(1);
        }
        // strips commas to get raw count
        let count = 0;
        count = tmp.replace(/\,/g, "").length;
        // adds missing commas dynamically
        let arr = tmp.split("");
        let commaCount = 0;
        let inc = 0;
        arr.forEach((chr, idx) => {
            inc++;
            if (commaCount < 3) {
                if(chr === ",") {
                    commaCount++;
                    inc = 0;
                }
                if (inc > 3 && chr !== ",") {
                    tmp = tmp.substring(0,idx) + "," + tmp.substring(idx);
                    inc = 0;
                }
            }
            // restrict section 4 to a digit-decimal-digit-digit pattern
            if (commaCount === 3) {
                if (inc === 1 && chr.match(/[^\d]/gim) != null && chr.match(/[^\d]/gim).length > 0) {
                    tmp = tmp.substring(0, idx);
                }
                if (inc === 2 && chr.match(/[^\.]/gim) != null && chr.match(/[^\.]/gim).length > 0) {
                    tmp = tmp.substring(0, idx);
                }
                if (inc === 3 && chr.match(/[^\d]/gim) != null && chr.match(/[^\d]/gim).length > 0) {
                    tmp = tmp.substring(0, idx);
                }
                if (inc === 4 && chr.match(/[^\d]/gim) != null && chr.match(/[^\d]/gim).length > 0) {
                    tmp = tmp.substring(0, idx);
                }
            }
            // caps sections to 3 chars
            if (commaCount === 3 && inc > 4) {
                tmp = tmp.substring(0, idx);
            }
        });

        // limit rgb input to 0-255
        // also, parses value > 0, starting with 0 eg. 010
        tmp = tmp.split(',').map(item => {
            if (item % 1 != 0) {
                // float number
                return item;
            } else if (item > 255) {
                return parseInt(item.substring(0, item.length-1));
            } else if (item > 0) {
                return parseInt(item);
            } else {
                return item;
            }
        }).join();

        if (count >= 15) {
            // sets limit to 16 with commas
            return tmp.substring(0, 16);
        } else if (tmp.indexOf(".") !== -1 && tmp.match(/\./g).length > 1) {
            // restrict fullstops
            return tmp.substring(0, tmp.length-1);
        } else if (tmp.indexOf(",") !== -1 && tmp.match(/\,/g).length > 3) {
            // restricts to 4 sections based on 3 commas
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
        if (tmp.length >= 9) {
            return tmp.substring(0, 8);
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
            case 'alpha':
                return convertHsl(data);
        }
    },

    randomise: () => getColourObject(tinycolor.random()),

    lighten: (colour) => getColourObject(tinycolor(colour).lighten()),

    darken: (colour) => getColourObject(tinycolor(colour).darken())

};

module.exports = helper;
