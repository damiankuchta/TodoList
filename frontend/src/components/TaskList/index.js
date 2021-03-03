import {useEffect} from 'react'

import './task_list.css'
import Task from "../Task";

export default function TaskList(props) {
    const placeHolder = "Loading..."

    const {tasks, setTasks} = props
    const {setToggledTasks} = props
    const {isTasksLoaded, setIsTasksLoaded } = props
    const {taskApiLink, query} = props

    // load tasks for a first time
    useEffect(() => {
        fetch(taskApiLink + query)
            .then(response => {return response.json()})
            .then(tasks => setTasks(() => {return [...tasks]}))
            .then(() => setIsTasksLoaded(() => { return {isTasksLoaded: true}}))

    }, [setTasks, setIsTasksLoaded, taskApiLink, query])

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