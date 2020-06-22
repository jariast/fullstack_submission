import React, { useState } from 'react';

const Toggable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="row">
      <div className="col" style={hideWhenVisible}>
        <button className="btn btn-success" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div className="col" style={showWhenVisible}>
        <button className="btn btn-info" onClick={toggleVisibility}>
          Cancel
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Toggable;
