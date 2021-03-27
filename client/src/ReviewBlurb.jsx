import React, { useState } from 'react';
import Styles, { ContainerUserReview, Pic, Name, FirstName, Date, Description, Avatar, PicName, Blurb } from './Styles.js';

const ReviewBlurb = (props) => {
  const [months, setMonths] = useState({
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  })
    return (
      <ContainerUserReview data-testid="reviewBlurbTest">
        <p></p>
        <Blurb>

          <PicName>
            <Pic>
              <p></p>{<Avatar src={`https://fecuserphotos.s3.us-east-2.amazonaws.com/${props.review.userId}.jpg`}/>}
            </Pic>

            <Name>
              <FirstName>
              {props.users[props.review.userId + 1]}
              </FirstName>
              <Date>
              {months[props.review.month]} {props.review.year}
              </Date>
            </Name>
          </PicName>

          <Description>
            <br/>{props.review.description}
          </Description>

        </Blurb>
      </ContainerUserReview>
    )
}

export default ReviewBlurb;