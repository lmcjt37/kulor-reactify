var tinycolor = require("tinycolor2");

function stripToRaw(colour) {
    return JSON.stringify(colour).replace(/[^\w\s]|(^rgb)/g, "");
};

function convertRgb(data) {
    var rgb = stripToRaw(data.rgb);
    console.log(rgb);
    // return {
    //     "rgb": rgb,
    //     "hex": tinycolor(rgb).toHex(),
    //     "hue": tinycolor(rgb).toHsl()["h"],
    //     "saturation": tinycolor(rgb).toHsl()["s"],
    //     "lightness": tinycolor(rgb).toHsl()["l"],
    //     "isDark": tinycolor(rgb).isDark()
    // };
};

function convertHex(data) {
    var hex = stripToRaw(data.hex);
    return {
        "rgb": stripToRaw(tinycolor(hex).toRgbString()),
        "hex": hex,
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
