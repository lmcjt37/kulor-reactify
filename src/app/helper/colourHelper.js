var tinycolor = require("tinycolor2");

function stripToRaw(colour) {
    return JSON.stringify(colour).replace(/[^\w\s]|(^rgb)/g, "");
};

function convertRgb(data) {
    console.log(data.rgb);
    return {
        "rgb": data.rgb,
        "hex": tinycolor(rgb).toHex(),
        "hue": tinycolor(rgb).toHsl()["h"],
        "saturation": tinycolor(rgb).toHsl()["s"],
        "lightness": tinycolor(rgb).toHsl()["l"],
        "isDark": tinycolor(rgb).isDark()
    };
};

function convertHex(data) {
    return {
        "rgb": stripToRaw(tinycolor(hex).toRgbString()),
        "hex": data.hex,
        "hue": tinycolor(hex).toHsl()["h"],
        "saturation": tinycolor(hex).toHsl()["s"],
        "lightness": tinycolor(hex).toHsl()["l"],
        "isDark": tinycolor(hex).isDark()
    };
}

function convertHsl(data) {
    var hsl = {
        h: data.hue,
        s: data.saturation,
        l: data.lightness
    };
    return {
        "rgb": stripToRaw(tinycolor(hsl).toRgbString()),
        "hex": tinycolor(hsl).toHex(),
        "hue": data.hue,
        "saturation": data.saturation,
        "lightness": data.lightness,
        "isDark": tinycolor(hsl).isDark()
    };
};

var helper = {

    validateRgb: function(rgb) {
        if (rgb.length === 3 || rgb.length === 6 || rgb.length === 9) {
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

    convertColours: function(data) {
        switch(data.type) {
            case 'rgb':
                if (helper.validateRgb(data.rgb)) {
                    return convertRgb(data);
                }
                break;
            case 'hex':
                if (helper.validateHex(data.hex)) {
                    return convertHex(data);
                }
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
