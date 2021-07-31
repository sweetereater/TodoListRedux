import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../store/store';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../store/tasks-reducer';
import EditableText from './EditableText';
import { TaskType } from './Todolist';

type TaskPropsType = {
    id: string
    todoListId: string
}

export default function Task(props: TaskPropsType) {

    const task = useSelector<AppStateType, TaskType>(state => state.tasks[props.todoListId].filter(task => task.id === props.id)[0]);
    const dispatch = useDispatch();

    const handleChangeTaskStatus = () => {
        dispatch(changeTaskStatusAC(props.id, props.todoListId));
    }

    const handleChangeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(props.id, props.todoListId, title));
    }

    const handleRemoveTask = () => {
        dispatch(removeTaskAC(props.id, props.todoListId));
    }

    return (
        <li>
            <IconButton
                onClick={handleRemoveTask}
                size="small"
            > <Delete /> </IconButton>
            <Checkbox
                color="primary"
                checked={task.isDone}
                onChange={handleChangeTaskStatus}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <EditableText
                title={task.title}
                changeTitle={handleChangeTaskTitle} />
        </li>
    )
}