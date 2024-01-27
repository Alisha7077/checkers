import React from 'react';

const Bird = ({ birdStyle }) => {
  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: 'yellow',
        position: 'absolute',
        top: birdStyle.y,
        left: birdStyle.x,
        borderRadius: '50%',
      }}
    />
  );
};

export default Bird;
