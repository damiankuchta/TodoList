import {useState} from "react";

export default function TaskDate(props){

    const [date, setDate] = useState(props.date)
    const [editable, setEditable] = useState(false)

    const {updateTask} = props
    const {canEdit} = props

    function onDateClick() {
        setEditable(() => (true))
    }

    function onDateFocusOut() {
        updateTask({to_be_completed_date: date})
        setEditable(() => (false))
    }

    function onChange(event) {
        setDate(() => (event.target.value))
    }

    return (
        canEdit ?
        editable ?
            <input onChange={onChange} onBlur={onDateFocusOut} value={date} type={"date"} autoFocus={true}/> :
            <span onClick={onDateClick}>{date} </span> :
        <span>{date} </span>
    )
}