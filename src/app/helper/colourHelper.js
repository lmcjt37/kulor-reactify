const tinycolor = require("tinycolor2");
let helper = {};

let parseRgb = (rgb, type) => {
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
            break;
        case "string":
            return rgb.r + "," + rgb.g + "," + rgb.b;
            break;
    }
};

let parseDecimal = (dec) => {
    if (dec > 1) {
        return Math.round(dec.toFixed(2));
    } else {
        return Math.round((dec.toFixed(2)) * 100);
    }
};

let objectifyHsl = (data) => {
    return {
        h: data.hue,
        s: data.saturation,
        l: data.lightness
    };
};

let convertRgb = (data) => {
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

let convertHex = (data) => {
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

let convertHsl = (data) => {
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

    validateColours: (colour) => {
        switch (colour.type) {
            case "rgb":
                return helper.validateRgb(colour.rgb);
                break;
            case "hex":
                return helper.validateHex(colour.hex);
                break;
            default:
                // hsl values will default
                return true;
        }
    },

    trimRgb: (colour) => {
        let tmp = JSON.stringify(colour).replace(/[^\w\s\,\.]|[rgb]/g, "");
        let count = 0;
        if (tmp.substring(11, 12) === ",") {
            tmp = tmp.substring(0, 11);
        }
        if (tmp.substring(0, 1) === " ") {
            tmp = tmp.substring(1);
        }
        count = tmp.replace(/,/g, "").length;

        if (count >= 10) {
            return tmp.substring(0, 11);
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
                break;
            case 'hex':
                return convertHex(data);
                break;
            case 'hue':
            case 'saturation':
            case 'lightness':
                return convertHsl(data);
                break;
        }
    }

};

module.exports = helper;
