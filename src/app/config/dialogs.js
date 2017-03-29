
const dialogs = {
    helphints: {
        title: "Help Hints",
        text: [
            "RGB input should be comma delimented. It accepts 3 numbers for red, green and blue, where each value should be between 0(black) and 255(white). Examples; rgb(255,255,255), 111,222,333",
            "HEX input is a six digit value where every 2 digits represents red, green and blue. Values for each colour can range from 0(black)-9...A-F(White). Examples; FF6600, #1199FF",
            "HUE, SATURATION, and LIGHTNESS represent the HSL colour mode. Hue accepts a value of 0-360, Saturation and Lightness accept a value of 0-100.",
            "Random allows you to quickly find new colours, some good, some bad, some ugly.",
            "Lighten/Darken, lighten and darken the current colour by 10%.",
            "Alpha allows you to alter your colour with opacity to two decimal places"
        ]
    }
}

export default dialogs;
