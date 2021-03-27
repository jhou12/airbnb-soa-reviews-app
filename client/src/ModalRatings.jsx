import React from 'react';
import Styles, { ModalContainerAvgs, ModalRating, ModalRatingAvg } from './Styles.js';
import RatingBar from './RatingBar.jsx'

const ModalRatings = (props) => {
  return (
      <ModalContainerAvgs>

          <ModalRating>
            <div>Cleanliness</div>
            <ModalRatingAvg>
              <RatingBar rating={props.averages.avgCleanliness}/>
              {props.averages.avgCleanliness}
            </ModalRatingAvg>
          </ModalRating>

          <ModalRating>
            <div>Accuracy</div>
            <ModalRatingAvg>
              <RatingBar rating={props.averages.avgAccuracy}/>
              {props.averages.avgAccuracy}
            </ModalRatingAvg>
          </ModalRating>

          <ModalRating>
            <div>Communication</div>
            <ModalRatingAvg>
              <RatingBar rating={props.averages.avgCommunication}/>
              {props.averages.avgCommunication}
            </ModalRatingAvg>
          </ModalRating>

          <ModalRating>
            <div>Location</div>
            <ModalRatingAvg>
              <RatingBar rating={props.averages.avgLocation}/>
              {props.averages.avgLocation}
            </ModalRatingAvg>
          </ModalRating>

          <ModalRating>
            <div>Check-in</div>
            <ModalRatingAvg>
              <RatingBar rating={props.averages.avgCheckIn}/>
              {props.averages.avgCheckIn}
            </ModalRatingAvg>
          </ModalRating>

          <ModalRating>
            <div>Value</div>
            <ModalRatingAvg>
              <RatingBar rating={props.averages.avgValue}/>
              {props.averages.avgValue}
            </ModalRatingAvg>
          </ModalRating>

      </ModalContainerAvgs>
  )
}

export default ModalRatings;