"use client";

import React, { useState } from "react";

function Goals({ goals, onSelectGoal }) {
    return (
    <div className="sidebar">
      <div className="goals">Goals</div>
      {goals.map(goal => (
        <div 
          key={goal.id} 
          className="goal" 
          onClick={() => onSelectGoal(goal.id)}
        >
          {goal.text}
        </div>
      ))}
    </div>
  )
}
export default Goals