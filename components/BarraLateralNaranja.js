import React from 'react';
import { Path, Svg } from 'react-native-svg'
import { Dimensions } from 'react-native';

function BarraLateralNaranjaIcon(props) {
return (
  <Svg 
    width="100" 
    height={`${Dimensions.get('window').height}`} 
    viewBox="0 0 677 5785" 
    shapeRendering="geometricPrecision" 
    textRendering="geometricPrecision" 
    imageRendering="optimizeQuality" 
    fillRule="evenodd" 
    clipRule="evenodd"
    style={props.style}
  >
    <Path d="M572 5711.134V5785h105V0H572v5041.134c0 91-73 164-164 164H171c-94 0-171 77-171 172 0 94 77 171 171 171h237c90 0 163 73 164 163z" 
    fill={props.fill} fillRule="nonzero"/>
  </Svg>
);
}

export default BarraLateralNaranjaIcon;