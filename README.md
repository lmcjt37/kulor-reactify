# Kulor-reactify

## Description
This is a colour conversion app that allows you to convert colours between RGB, HEX and HSL colour modes. The background of the app updates to provide you with a representation of what the colour you are converting looks like. It is written using vanilla React without any flux/redux framework to keep it simple.

Includes:
* Randomisation
* Lighten (default: +10%, can be controlled by variance slider)
* Darken (default: -10%, can be controlled by variance slider)
* Handles alpha and conversion
* Handy Help Hints to get you going
* Quickly copy the input for wherever it's needed
* More to come...

## Getting Started
1. Clone this repository
2. Run `npm install && npm start`, this will install all dependencies, build and start up the server
3. Visit `localhost:9000` in your browser.

Working project: http://lmcjt.com/kulor

## Scripts

`npm start` This starts the local server on port 9000.

`npm run test` Runs test suite. (TBC)

`npm run build` This will run tests and then build app for production without additional plugins.

### Tools
- React-toolbox (http://react-toolbox.com/)
- SASS (http://sass-lang.com/)
- TinyColour (https://github.com/bgrins/TinyColor)

### Acknowledgements
- Navigation is based on [Lucas Bebber's Gooey Menu](http://codepen.io/lbebber/pen/rawQKR) but has been altered to work alongside React and React-toolbox
- Github corner link was created by [Tim Holman](http://tholman.com/github-corners/)

### Pipeline
- Colour palette for storing colours from the session
- Ability to get different colour combos (triad/complementary/tetrad)

## Contact
Feel free to contact me directly through twitter @lmcjt or my website [lmcjt.com](http://lmcjt.com)

## Contributing
- Fork and submit PR's
- Raise issues/suggestions
- Contact me directly for further information

It's an ongoing project and contributions, issues or suggestions are welcome. You can contact me by any method you feel comfortable with. I don't adhere to any code of conduct, I just appreciate using your common sense and respecting others. Play nicely :kissing_heart:

## Troubleshooting
- Make sure to run `npm install` on first run of code to avoid console warnings/errors.
- If you receive "Node Sass could not find a binding for your current environment" error, try running `npm rebuild node-sass` to build the binding for your current environment.
