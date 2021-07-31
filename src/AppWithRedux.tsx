import './App.css';
import { TaskType } from './Components/Todolist';
import { TodoListRedux } from './Components/Todolist';
import { Input } from './Components/Input';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addTodoListAC } from './store/todolists-reducer';
import { AppStateType } from './store/store';
import { useDispatch, useSelector } from 'react-redux';

export type FilterType = "All" | "Active" | "Completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {

    // useSelector (from react-redux) - берем state из Стора
    const todos = useSelector<AppStateType, Array<TodoListType>>(state => state.todoLists);

    // useDispatch - нужно для диспатча action'ов в Стор
    const dispatch = useDispatch();


    // Methods for todolists

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button variant="outlined" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <div className="newTaskInput"><Input label="Add new TodoList" handleChange={addTodoList} /></div>
                <Grid container>
                    {
                        todos.map(todolist => {
                            return (
                                <TodoListRedux
                                    key={todolist.id}
                                    todoListId={todolist.id}
                                />
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

