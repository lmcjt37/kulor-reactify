import React from 'react';
import Button from '../components/Button';

export default ({
  buttonBarClasses,
  random
}) => (
    <div className={buttonBarClasses}>
        <Button {...random} />
    </div>
);
