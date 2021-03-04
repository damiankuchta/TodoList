import React, {useState} from "react"

import TaskList from "../TaskList";
import AddTaskForm from "../AddTaskForm";
import "./style.css"

export default function Tasks(props) {

    const taskApiLink = "http://localhost:8000/api/task/"

    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])

    const [isTasksLoaded, setIsTasksLoaded] = useState(false)
    const [isCompletedTasksLoaded, setIsCompletedTasksLoaded] = useState(false)

    const [newTaskData, setNewTaskData] = useState({
            name: "",
            to_be_completed_date: ""
    })

    return (
        <div className="task-container">
            <AddTaskForm
                setTasks={setTasks}
                newTaskData={newTaskData}
                setNewTaskData={setNewTaskData}
                taskApiLink={taskApiLink}/>

            <TaskList
                header="Tasks to be done"
                tasks={tasks}
                setTasks={setTasks}
                setToggledTasks={setCompletedTasks}
                setIsTasksLoaded={setIsTasksLoaded}
                isTasksLoaded={isTasksLoaded}
                taskApiLink={taskApiLink}
                query="?is_completed=false"
                sortBy="to_be_completed_date"/>

            <TaskList
                header="Tasks Completed"
                tasks={completedTasks}
                setTasks={setCompletedTasks}
                setToggledTasks={setTasks}
                setIsTasksLoaded={setIsCompletedTasksLoaded}
                isTasksLoaded={isCompletedTasksLoaded}
                taskApiLink={taskApiLink}
                query="?is_completed=true"/>
        </div>
    );
}

