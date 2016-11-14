var tinycolor = require("tinycolor2"),
    helper;

function parseRgb(rgb, type) {
    switch(type) {
        case "object":
            var re,
                tmp = helper.trimRgb(rgb);
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

function parseDecimal(dec) {
    return Math.round((dec.toFixed(2)) * 100);
};

function objectifyHsl(data) {
    return {
        h: data.hue,
        s: data.saturation,
        l: data.lightness
    };
};

function convertRgb(data) {
    var rgb = parseRgb(data.rgb, "object");
    return {
        "rgb": parseRgb(rgb, "string"),
        "hex": tinycolor(rgb).toHex(),
        "hue": parseDecimal(tinycolor(rgb).toHsl()["h"]),
        "saturation": parseDecimal(tinycolor(rgb).toHsl()["s"]),
        "lightness": parseDecimal(tinycolor(rgb).toHsl()["l"]),
        "isDark": tinycolor(rgb).isDark()
    };
};

function convertHex(data) {
    return {
        "rgb": parseRgb(tinycolor(data.hex).toRgb(), "string"),
        "hex": data.hex,
        "hue": parseDecimal(tinycolor(data.hex).toHsl()["h"]),
        "saturation": parseDecimal(tinycolor(data.hex).toHsl()["s"]),
        "lightness": parseDecimal(tinycolor(data.hex).toHsl()["l"]),
        "isDark": tinycolor(data.hex).isDark()
    };
}

function convertHsl(data) {
    var hsl = objectifyHsl(data);
    return {
        "rgb": parseRgb(tinycolor(hsl).toRgb(), "string"),
        "hex": tinycolor(hsl).toHex(),
        "hue": data.hue,
        "saturation": data.saturation,
        "lightness": data.lightness,
        "isDark": tinycolor(hsl).isDark()
    };
};

var helper = {

    validateRgb: function(rgb) {
        if (rgb.length > 0) {
            return true;
        }
        return false;
    },

    validateHex: function(hex) {
        if (hex.length === 3 || hex.length === 6) {
            return true;
        }
        return false;
    },

    validateColours: function(colours) {
        return (
            helper.validateRgb(colours.rgb) ||
            helper.validateHex(colours.hex)
        );
    },

    trimRgb: function(colour) {
        return JSON.stringify(colour).replace(/[^\w\s\,\.]|[rgb]/g, "");
    },

    trimHex: function(colour) {
        return JSON.stringify(colour).replace(/[^a-f1-6\s]/g, "");
    },

    convertColours: function(data) {
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
