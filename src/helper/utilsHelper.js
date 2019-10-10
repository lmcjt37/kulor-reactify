const helper = {

    getScreenWidth: () => window.innerWidth,

    getScreenHeight: () => window.innerHeight,

    getScreenSize: () => {
        const width = helper.getScreenWidth();
        if (width < 768) {
            if (width < 481) {
                return { isHandheld: true, rgbOpacity: 0, hexOpacity: 0 };
            } else {
                return { isHandheld: true, rgbOpacity: 1, hexOpacity: 1 };
            }
        } else {
            return { isHandheld: false, rgbOpacity: 1, hexOpacity: 1 };
        }
    }

};

module.exports = helper;
