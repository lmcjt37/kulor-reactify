import React from 'react';
import Main from './theme/main.css';

import Inputs from './components/Input.js';
import Sliders from './components/Slider.js';
import Header from './components/Header.js';

const App = () => (
    <div className={Main.fullPage}>
        <Header />
        <div className={Main.centerControls}>
            <Inputs />
            <Sliders />
        </div>
    </div>
);

export default App;
