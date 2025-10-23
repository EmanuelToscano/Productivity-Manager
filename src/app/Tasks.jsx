"use client";

import React, { useState } from "react";

function Tasks({updateGoal, currentGoal, updateTasks}) {
    // State = list of tasks (empty at start)
    const tasks = Array.isArray(currentGoal?.tasks) ? currentGoal.tasks : [];
    const startText = tasks.length === 0 ? "Click here to add tasks...": "";
  
    // Add a new empty task at the top
    const handleClick = () => {
        const newTask = { id: Date.now(), text: "", completed: false};
        updateTasks([newTask, ...tasks]); // put new one first
    };

    //Add at a specific index
    const handleClickAt = (index) => {
        const newTask = { id: Date.now(), text: "", completed: false};
        const newTasks = [...tasks];           // copy current array
        newTasks.splice(index + 1, 0, newTask); // insert after clicked task
        updateTasks(newTasks);                     // update state
    };

    const removeTask = (taskId) => {
        const newTasks = currentGoal.tasks.filter(task => task.id !== taskId);
        updateTasks(newTasks);
    };


    // Update text inside a specific task
    const updateTask = (id, value) => {
        updateTasks(tasks.map(task =>
        task.id === id ? { ...task, text: value } : task
        ));
    };

    const updateCompleted = (id, checked) => {
        updateTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: checked} : task
        ));
    };

    const prog = tasks.filter(task => task.completed).length;

    return (
        <div className="main">
            <input
                type="text"
                className="title"
                value = {currentGoal.text}
                onChange={(e) => updateGoal(currentGoal.id, e.target.value)}
            />
            <div className="empty">
                <div className="progress-bar" style={{ width: `${(prog / tasks.length) * 100}%` }}></div>
            </div>
            <div className="progress">{`${prog}/${tasks.length} tasks done`}</div>
            <div className="task">
                {/* button stays on top */}
                <button className="tab" onClick={handleClick}>
                    <div className="tab-text">{startText}</div>
                </button>
                {/* render tasks below */}
                {tasks.map((task, index) => (
                    <>
                        <div key={task.id}>
                            <input
                                type="checkbox"
                                className="check"
                                checked={task.completed}
                                onChange={(e) => updateCompleted(task.id, e.target.checked)}
                            />
                            <input
                                type="text"
                                className="text"
                                value={task.text}
                                onChange={(e) => updateTask(task.id, e.target.value)}
                                placeholder={`Task ${index + 1}`}
                            />
                            <button className="remove" onClick={() => removeTask(task.id)}>-</button>
                        </div>
                        <button className="tab" onClick={() => handleClickAt(index)}></button>
                    </>
                ))}
            </div>
        </div>
    );
}

export default Tasks;
