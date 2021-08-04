import React from 'react'
import CardScroller from './components/CardScroller'
import cards from './cards.json'
import './style.css'

const TaskPage = () => {
  console.log(cards)
  return (
    <div className="task-page">
      <CardScroller
        cards = {cards}
        defaultSelectedId = {"5"}
        defaultVisibleCount = {3}
      />
    </div>
  )
}

export default TaskPage
