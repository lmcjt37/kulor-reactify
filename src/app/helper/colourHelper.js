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
            if (rgb.a) {
                return rgb.r + "," + rgb.g + "," + rgb.b + "," + rgb.a;
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

const objectifyHsl = (data) => {
    const { hue, saturation, lightness, alpha } = data;
    if (alpha === "1.0") {
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
            a: alpha
        };
    }
};

const convertRgb = (data) => {
    let rgb = parseRgb(data.rgb, "object");
    return {
        "rgb": parseRgb(rgb, "string"),
        "hex": rgb.a ? tinycolor(rgb).toHex8() : tinycolor(rgb).toHex(),
        "hue": parseDecimal(tinycolor(rgb).toHsl()["h"]),
        "saturation": parseDecimal(tinycolor(rgb).toHsl()["s"]),
        "lightness": parseDecimal(tinycolor(rgb).toHsl()["l"]),
        "alpha": tinycolor(rgb).toHsl()["a"],
        "theme": tinycolor(rgb).isDark() ? "light" : "dark",
        "bgColour": rgb.a ? tinycolor(rgb).toHex8() : tinycolor(rgb).toHex()
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
        "theme": tinycolor(data.hex).isDark() ? "light" : "dark",
        "bgColour": data.hex
    };
}

const convertHsl = (data) => {
    let hsl = objectifyHsl(data);
    return {
        "rgb": parseRgb(tinycolor(hsl).toRgb(), "string"),
        "hex": hsl.a ? tinycolor(hsl).toHex8() : tinycolor(hsl).toHex(),
        "hue": data.hue,
        "saturation": data.saturation,
        "lightness": data.lightness,
        "alpha": data.alpha,
        "theme": tinycolor(hsl).isDark() ? "light" : "dark",
        "bgColour": hsl.a ? tinycolor(hsl).toHex8() : tinycolor(hsl).toHex()
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
    "theme": color.isDark() ? "light" : "dark",
    "bgColour": color.toHex()
});

helper = {

    validateColours({type, rgb, hex}) {
        switch (type) {
            case "rgb":
                return rgb.match(/^(\d+\,\s*\d+\,\s*\d+)$|^(\d+\,\s*\d+\,\s*\d+\,(\d\.\d))$|^(\s*\d{1,3}\s\d{1,3}\s\d{1,3})$|^(\s*\d{1,3}\s\d{1,3}\s\d{1,3}\s(\d\.\d))$/gim) !== null;
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
        if (tmp.substring(15, 16) === ",") {
            tmp = tmp.substring(0, 15);
        }
        // trims space (if exists) from conversion
        if (tmp.substring(0, 1) === " ") {
            tmp = tmp.substring(1);
        }
        // strips commas to get raw count
        let count = 0;
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

        if (count >= 14) {
            console.log(1);
            // sets limit to 15 with commas
            return tmp.substring(0, 15);
        } else if (tmp.indexOf(",") !== -1 && tmp.match(/,/g).length > 3) {
            console.log(2);
            // restricts to 4 sections based on 3 commas
            return tmp.substring(0, tmp.length-1);
        // } else if (tmp.match(/,/g).length === 3 && tmp.indexOf(".") !== -1 && tmp.match(/./g).length >= 2) {
        //     console.log(3);
        //     // restrict fullstops
        //     return tmp.substring(0, tmp.length-1);
        } else {
            console.log(4);
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
