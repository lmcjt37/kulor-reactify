import React from 'react';
import Overrides from './theme/overrides.css';

import Inputs from './components/Input.js';
import Sliders from './components/Slider.js';
import Header from './components/Header.js';

const App = () => (
    <div className={Overrides.fullPage}>
        <Header />
        <div className={Overrides.centerControls}>
            <Inputs />
            <Sliders />
        </div>
    </div>
);

export default App;
