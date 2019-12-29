import React from 'react';

const Circle = (props) => {
  const { color } = props;
  return (
    <div
      style={{
        backgroundColor: color,
        width: '25px',
        padding: 0,
        height: '25px',
        margin: 0,
        borderRadius: '25px',
        float: 'left',
      }}
    />
  );
};

export default Circle;
