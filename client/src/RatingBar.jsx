import React from 'react';
import Styles, { BarContainer, BarGray, BarBlack } from './Styles.js';

const RatingBar = (props) => {
  const styles = {
    width: `${props.rating/5 * 100}%`
  }
return (
  <BarContainer>
    <BarGray></BarGray>
    <BarBlack style={styles}></BarBlack>
  </BarContainer>
)
}

export default RatingBar;