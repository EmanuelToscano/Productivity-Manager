"use client";

import React, { useState, useEffect } from "react";
import Goals from "./Goals.jsx";
import Tasks from "./Tasks.jsx";

//default goals
const defaultGoals = [
    { id: 1, text: "Finish Website", tasks: [{ id: 1, text: "Build sidebar", completed: false }] },
    { id: 2, text: "Graduate University", tasks: [{ id: 1, text: "Complete courses", completed: false }] }
];
/*up to here */
export default function Site() {
    //goals is the value, setGoals is the function that sets the goals
    const [goals, setGoals] = useState(
        //This runs once on the first render
        () => {
            //set saved to the goals from the broswers data
            const saved = localStorage.getItem("goals");
            //return the parsed version of saved to goals if theres actual data there, and if not just use the default goals
            return saved ? JSON.parse(saved) : defaultGoals;
        }
    );

    //currentGoalId is the value, setCurrentGoalId is the function that sets the current goal id
    const [currentGoalId, setCurrentGoalId] = useState(
        () => {
            //set savedId to the browsers data
            const savedId = localStorage.getItem("currentGoalId");
            //return the parsed version of savedId if there is a saveId otherwise return 1
            return savedId ? JSON.parse(savedId) : 1;
        }
    );

    //this sets the currentGoal to the goal in which the goal.id is the same as the currentGoalID
    const currentGoal = goals.find(g => g.id === currentGoalId);

    // Save to LocalStorage whenever goals change (goals is the dependency here)
    //setting "goals" aka local memory to whatever goals is which is tje state variable
    useEffect(
        () => {
            localStorage.setItem("goals", JSON.stringify(goals));
        }, [goals]
    );

    // Save currentGoalId if you want goal selection persisted
    //when current Goal id changes save it in local memory
    useEffect(
        () => {
            localStorage.setItem("currentGoalId", JSON.stringify(currentGoalId));
        }, [currentGoalId]
    );

    // Update tasks for a specific goal
    //params are goalId and newTasks
    const updateTasks = (goalId, newTasks) => {
        //call set Goals and set 
        //passes prevGoals as a value
        setGoals(prevGoals =>
            //iterates through prev goals till g id matches goal id if it does 
            //set the tasks in g to be new tasks else leave g unchanged
            //...g spreads the current g so that we can access tasks and set it to new tasks
            //.map returns a new array with our data
            prevGoals.map(
                g => g.id === goalId ? { ...g, tasks: newTasks } : g
            )
        );
    };

    const updateGoals = (goalId, value) =>{
        setGoals(prevGoals =>
            prevGoals.map(
                g => g.id === goalId ? { ...g, text: value } : g
            )
        );
    }

    return (
        <div className="container">
        {/*Passes goals and onSelectGoal*/}
        <Goals goals={goals} onSelectGoal={setCurrentGoalId} />
        {/*Passes currentGoal and update tasks*/}
        <Tasks
            updateGoal={(id, value) => updateGoals(id, value)}
            currentGoal={currentGoal}
            updateTasks={(newTasks) => updateTasks(currentGoalId, newTasks)}
        />
        </div>
    );
}
