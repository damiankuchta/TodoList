import {useState} from 'react'

export default function TaskName(props) {

    const [name, setName] = useState(props.name)
    const [editable, setEditable] = useState(false)

    const {updateTask} = props

    function onNameClick() {
        setEditable(() => (true))
    }

    function onNameFocusOut() {
        updateTask({name: name})
        setEditable(() => (false))
    }

    function onChange(event) {
        setName(() => (event.target.value))
    }

    return (
        editable ?
            <input onChange={onChange} onBlur={onNameFocusOut} value={name} type={"text"} autoFocus={true}/> :
            <span onClick={onNameClick}>{name} </span>
    )
}