import React from 'react';
import { Path, Svg } from 'react-native-svg'
import { Dimensions } from 'react-native';

function BarraLateralNaranjaBIcon(props) {
return (
  <Svg 
    style={props.style}
    width={260} 
    height={Dimensions.get('screen').height} 
      viewBox="0 0 1884.453 5785"
      clipRule="evenodd" fillRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision">
      <Path d="M1778.049 5711.135V5785h105V0h-105v5041.135c0 91-73 164-164 164H170.999c-94 0-171 77-171 172 0 94 77 171 171 171h1443.05c90 0 163 73 164 163z"
        fill="#ec6a2c"
        fillRule="nonzero"
      />
    </Svg>
);
}

export default BarraLateralNaranjaBIcon;