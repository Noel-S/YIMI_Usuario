import React from 'react';
import { Path, Svg } from 'react-native-svg'

function FlechaBlancaIcon(props) {
return (
  <Svg 
    width="20.904" 
    height="14.001" 
    viewBox="0 0 49 33" 
    shapeRendering="geometricPrecision" 
    textRendering="geometricPrecision" 
    imageRendering="optimizeQuality" 
    fillRule="evenodd" clipRule="evenodd"
    style={props.style}
  >
    <Path fill={props.fill?props.fill:'#fff'} fillRule="nonzero" d="M32 33l-1-2 13-13H0v-3h44L31 2l1-2 17 16z"/>
  </Svg>
);
}

export default FlechaBlancaIcon;