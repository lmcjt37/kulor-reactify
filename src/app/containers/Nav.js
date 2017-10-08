import React from 'react';
import ColourHelper from '../helper/colourHelper';
import themedGooeyNav from '../theme/themedGooeyNav';
import GooeyNavItem from '../components/gooey-nav/gooeyNavItem';

export default class Nav extends React.Component {

    constructor(props) {
        super(props);
    }

    onToggle() {
        this.props.onStateChange({
            isOpen: !this.props.isOpen
        });
    }

    handleClick(name) {
        switch(name){
            case "random":
                this.props.onStateChange(ColourHelper.randomise());
                break;
            case "lighten":
                this.props.onStateChange(ColourHelper.lighten(this.props.hex, this.props.variance));
                break;
            case "darken":
                this.props.onStateChange(ColourHelper.darken(this.props.hex, this.props.variance));
                break;
        }

    }

    getGooeyNavItems() {
        let array = [];
        for (var prop in this.props.features) {
            array.push(prop);
        }

        return array.map(name => {
            return (
                <GooeyNavItem
                    key={name}
                    theme={themedGooeyNav}
                    onClick={() => this.handleClick(name)}
                    {...this.props.features[name]} />
            );
        });
    }

    render() {
        return (
            <nav className={themedGooeyNav.menu}>
                <input type="checkbox" href="#" className={ themedGooeyNav['menu-open'] } name="menu-open" id="menu-open" onChange={ () => this.onToggle() } />
                <label className={ themedGooeyNav['menu-open-button'] } htmlFor="menu-open" >
                    <span className={`${themedGooeyNav.hamburger} ${themedGooeyNav['hamburger-1']}`}></span>
                    <span className={`${themedGooeyNav.hamburger} ${themedGooeyNav['hamburger-2']}`}></span>
                    <span className={`${themedGooeyNav.hamburger} ${themedGooeyNav['hamburger-3']}`}></span>
                </label>

                {this.getGooeyNavItems()}

            </nav>
        );
    }
}
