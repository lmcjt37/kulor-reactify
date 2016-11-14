var tinycolor = require("tinycolor2"),
    helper;

function parseRgb(rgb, type) {
    switch(type) {
        case "object":
            var tmp = helper.stripToRaw(rgb).split(/(\s|\,)/g);
            return {
                r: tmp[0],
                g: tmp[1],
                b: tmp[2]
            };
            break;
        case "string":
            return rgb.r + "," + rgb.g + "," + rgb.b;
    }
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
        "hue": tinycolor(rgb).toHsl()["h"],
        "saturation": tinycolor(rgb).toHsl()["s"],
        "lightness": tinycolor(rgb).toHsl()["l"],
        "isDark": tinycolor(rgb).isDark()
    };
};

function convertHex(data) {
    return {
        "rgb": parseRgb(tinycolor(data.hex).toRgb(), "string"),
        "hex": data.hex,
        "hue": tinycolor(data.hex).toHsl()["h"],
        "saturation": tinycolor(data.hex).toHsl()["s"],
        "lightness": tinycolor(data.hex).toHsl()["l"],
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
        if (rgb.length === 11) {
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

    stripToRaw: function(colour) {
        return JSON.stringify(colour).replace(/[^\w\s\,\.]|[rgb]/g, "");
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
