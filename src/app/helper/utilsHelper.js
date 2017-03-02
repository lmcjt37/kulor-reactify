const helper = {

    getScreenWidth: () => window.innerWidth,

    getScreenHeight: () => window.innerHeight,

    getScreenSize: () => {
        if (helper.getScreenWidth() < 768) {
            return { isHandheld: true };
        } else {
            return { isHandheld: false };
        }
    }

};

module.exports = helper;
