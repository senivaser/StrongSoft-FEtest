import React from 'react'

const Card = ({
  card, cardEl, visibleCount, endTransitionMethod
}) => {
  const { pos } = cardEl
  const {img, name, surname, dateOfBirth} = card
  return (
    <div 
      id = {card.id}
      className={`card`}
      style={{transform: `translateX(calc(${
        (pos > visibleCount)? visibleCount+1:
        (pos < -visibleCount)? -visibleCount-1:
        pos
      }*75px))`}}
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