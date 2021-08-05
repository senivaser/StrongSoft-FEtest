import React, { useState } from 'react'

const Card = ({
  card, cardEl, visibleCount, endTransitionMethod
}) => {
  const { id, pos, appearence } = cardEl
  const {img, name, surname, dateOfBirth} = card

  const appearanceObject = {
    'left': -visibleCount-1,
    'right': +visibleCount+1
  }

  console.log(appearence)
  const [bufferDistance, setBufferDistance] = useState(appearanceObject[appearence] || 0)
  const makeAppeared = () => { 
      setBufferDistance(0)
    console.log('makeApeared')
  }

  return (
    <div 
      id = {id}
      className={`card`}
      style={{
        transform: `translateX(calc(${
          (bufferDistance) ? bufferDistance:
          (pos > visibleCount)? visibleCount+1:
          (pos < -visibleCount)? -visibleCount-1:
          pos
          }*75px))`,
        opacity: `${(pos > visibleCount || pos < -visibleCount || bufferDistance)? '0': '1'}`
      }}

      onAnimationStart = {makeAppeared}
      onTransitionEnd = {(pos > visibleCount || pos < -visibleCount) ? endTransitionMethod: () => {}}
    >
      <div className="card-img-block">
        <img src = {img} alt="avatar"></img>
      </div>
      <div className="card-info-block">
        <div className="card-name">{name}</div>
        <div className="card-surname">{surname}</div>
        <div className="card-dateofbirth">{dateOfBirth}</div>
      </div> 
      
    </div>
  )
}

export default Card