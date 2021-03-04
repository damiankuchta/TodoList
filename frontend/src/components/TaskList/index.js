import {useEffect} from 'react'

import './task_list.css'
import Task from "../Task";

export default function TaskList(props) {
    const placeHolder = "Loading..."

    const {tasks, setTasks} = props
    const {setToggledTasks} = props
    const {isTasksLoaded, setIsTasksLoaded } = props
    const {taskApiLink, query} = props
    const {sortBy} = props


    // load tasks for a first time
    useEffect(() => {
        fetch(taskApiLink + query)
            .then(response => {return response.json()})
            .then(tasks => setTasks(() => {return [...tasks]}))
            .then(() => setIsTasksLoaded(() => { return {isTasksLoaded: true}}))

    }, [setTasks, setIsTasksLoaded, taskApiLink, query])

    useEffect(() => {
        if (sortBy) {
            let sortedTasks = tasks
            sortedTasks.sort((a, b) => {
                if (sortBy === "to_be_completed_date") {
                    return new Date(b.to_be_completed_date) - new Date(a.to_be_completed_date)
                }

            })
            setTasks(() => {
                return [...sortedTasks]
            })
        }
    }, [isTasksLoaded, tasks.length])

    return (
        <div>
            <h2>{props.header}</h2>
            <ul className="task-list">
                {isTasksLoaded ? tasks.map(task =>
                    <Task setToggledTasks={setToggledTasks}
                          taskApiLink={taskApiLink}
                          key={task.id}
                          task={task}
                          setTasks={setTasks}/>)
                    : placeHolder}
            </ul>
        </div>
    )
}

