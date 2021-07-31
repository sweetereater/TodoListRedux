import { FilterType, TodoListType } from '../AppWithRedux';
import { Input } from './Input';
import EditableText from './EditableText';
import { Button, ButtonGroup, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../store/store';

import { removeTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC } from '../store/todolists-reducer';
import { addTaskAC } from '../store/tasks-reducer';
import Task from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
}

export function TodoListRedux(props: PropsType) {

    const todo = useSelector<AppStateType, TodoListType>(state => state.todoLists.filter(todo => todo.id === props.todoListId)[0]);
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[props.todoListId]);
    const dispatch = useDispatch();

    //TodoLists
    const handleChangeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(props.todoListId, title));
    }

    const handleChangeTodoListFilter = (filter: FilterType) => {
        dispatch(changeTodoListFilterAC(props.todoListId, filter));
    }

    const deleteTodoList = () => {
        dispatch(removeTodoListAC(props.todoListId));
    }

    //Tasks
    const handleAddNewTask = (title: string) => {
        dispatch(addTaskAC(title, props.todoListId));
    };

    const showTasks = (task: TaskType) => {
        switch (todo.filter) {
            case "Active":
                return !task.isDone
            case "Completed":
                return task.isDone
            default:
                return true;
        }
    }

    return <div className="todolist">
        <h3>
            <EditableText title={todo.title} changeTitle={handleChangeTodoListTitle} />
            <IconButton
                onClick={deleteTodoList}
                size="small">
                <Delete />
            </IconButton>
        </h3>

        <div className="newTaskInput">
            <Input label="Add new task" handleChange={handleAddNewTask}></Input>
        </div>
        <ul>
            {
                tasks
                    .filter(task => showTasks(task))
                    .map(task => <Task key={task.id} id={task.id} todoListId={props.todoListId} />)
            }
        </ul>

        <div className="buttonGroup">
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">

                <Button
                    color={todo.filter === "All" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={() => handleChangeTodoListFilter("All")}>
                    All
                </Button>

                <Button
                    color={todo.filter === "Active" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={() => handleChangeTodoListFilter("Active")}>
                    Active
                </Button>

                <Button
                    color={todo.filter === "Completed" ? "secondary" : "primary"}
                    variant="contained"
                    onClick={() => handleChangeTodoListFilter("Completed")}>
                    Completed
                </Button>

            </ButtonGroup>
        </div>

    </div>
}
