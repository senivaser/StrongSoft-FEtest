import React, { useState, useEffect } from 'react'
import Card from './Card'

const getDistantElement = (arr, startElId, distance) => {
    
  try {
    // console.log({arr, startElId, distance})
    const length = arr.length
    const startIndex = arr.findIndex((el) => el.id === startElId)   
    const rawDistantIndex = (startIndex + distance)

    const distantIndex = (rawDistantIndex < 0) ?  
      rawDistantIndex + length:
      (rawDistantIndex >= length) ?
        rawDistantIndex - length:
        rawDistantIndex
    // console.log({rawDistantIndex, distantIndex, startIndex, length})
    return arr[distantIndex] 
    
  } catch (err) {
    console.log(err)
    return null
  }

}

const generateCardStack = (cards, selectedId, visibleCount) => {
    
  const stack = []
  let currentElement

  const selectedPos = (visibleCount%2) ? 0: -1
  
  for (let pos = -visibleCount + 1; pos <= visibleCount - 1; pos += 2) {
    
    currentElement = getDistantElement(cards, selectedId, (pos - selectedPos) / 2) 
    // console.log({currentElement, selectedPos, pos, visibleCount, selected, selectedElement})
    
    stack.push(
      {
        id: currentElement.id,
        pos
      }
    )    
  }
  
  return stack
}


const CardScroller = ({cards, defaultSelectedId, defaultVisibleCount}) => {

  const [visibleCount, stateVisibleCount] = useState(defaultVisibleCount)
  const [selectedId, setSelectedId] = useState(defaultSelectedId)
  const [cardStack, setCardStack] = useState(generateCardStack(cards, defaultSelectedId, defaultVisibleCount))
  const [nowMoving, setNowMoving] = useState(0)

  useEffect(() => {    
    if (nowMoving !== 0) {
      const newCardStack = [...cardStack]
      newCardStack.forEach((cardEl, index, arr) => arr[index].pos += nowMoving * 2)
      setCardStack(newCardStack)
      setSelectedId(getDistantElement(cards, selectedId, -nowMoving).id)
      setNowMoving(0)
    }
  }, [nowMoving])

  const placeCards = () => {
    const newCardStack = [...cardStack.filter(card => (card.pos > -visibleCount && card.pos < visibleCount))]
    setCardStack(newCardStack)
  }

  const moveHandler = (event) => {
   
    const direction = event.target.id
    console.log('moveHandler', direction)
    const params = {
      "left": {
        direction: 'left',
        oldEdgeIndex: cardStack.length - 1,
        newEdgeDistance: 1,
        newEdgeDeltaPos: 2,
        newEdgeMovement: -1
      },
      "right": {
        direction: 'right',
        oldEdgeIndex: 0,
        newEdgeDistance: -1,
        newEdgeDeltaPos: -2,
        newEdgeMovement: 1
      }
    }
      movePreparation(params[direction])
  }

  const movePreparation = (dirParams) => {
    console.log('movePreparation', dirParams)
    const {
      direction, oldEdgeIndex,
      newEdgeDistance, newEdgeDeltaPos,
      newEdgeMovement
    } = dirParams

    const oldEdge = cardStack[oldEdgeIndex];
    
    const newCardStack = [...cardStack]    
    
    const newEdge = getDistantElement(cards, oldEdge.id, newEdgeDistance)
    console.log({cards, oldEdge, newEdge, oldEdgeIndex, newEdgeDistance})

    const newStackEdge = {
      id: newEdge.id,
      pos: oldEdge.pos + newEdgeDeltaPos,
    }

    console.log({oldPos: oldEdge.pos, newEdgeDeltaPos, newStackEdgePos: newStackEdge.pos})

    if (direction === 'left') {
      newCardStack.push(newStackEdge)
    } 

    if (direction === 'right') {
      newCardStack.unshift(newStackEdge)
    } 


    console.log(newCardStack)

    setCardStack(newCardStack)
    setNowMoving(newEdgeMovement)   
    
  }

     
  return (
    <div className="scroller-block">
      <div 
        className="scroller-container"
      >
        {cardStack.map((cardEl) => {
          const card = cards.find(card => card.id === cardEl.id);
          return (
            <Card
              key = {card.id}
              card = {card}
              visibleCount = {visibleCount}
              cardEl = {cardEl}
              endTransitionMethod = {placeCards}
            ></Card>
          )
        })}
        <div className="buttons">
          <div id = "left" className="arrow left" onClick={moveHandler}></div>
          <div id = "right" className="arrow right" onClick={moveHandler}></div>           
        </div> 

          
      </div> 
      
    </div>
  )
}

export default CardScroller
