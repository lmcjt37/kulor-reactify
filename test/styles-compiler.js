// Mocha compiler for css-module support in tests using sass
// Fixes @import issues

const hook = require('css-modules-require-hook'),
    sass = require('node-sass'),
    path = require('path');

hook({
    extensions: ['.scss'],
    preprocessCss: (css, filepath) => {
        let result =  sass.renderSync({
            data: css,
            includePaths: [ path.resolve(filepath, '..') ]
        });
        return result.css;
    }
});
