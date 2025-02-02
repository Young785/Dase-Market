// components/LordIcon.js
import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

const LordIcon = ({ src, trigger, colors, className, style }) => {
  useEffect(() => {
    defineElement(lottie.loadAnimation);
  }, []);

  return (
    <lord-icon
      src={src}
      trigger={trigger}
      colors={colors}
      class={className}
      style={style}
    ></lord-icon>
  );
};

export default LordIcon;
