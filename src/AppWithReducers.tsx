import { useReducer } from 'react';
import './App.css';
import { TaskType } from './Components/Todolist';
import { v4 } from 'uuid';
import { Input } from './Components/Input';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { addTodoListAC, removeTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, todoListsReducer } from './store/todolists-reducer';
import { tasksReducer, addTaskAC, removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './store/tasks-reducer';

export type filterType = "All" | "Active" | "Completed";

export type TodoListType = {
    id: string
    title: string
    filter: filterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithReducers() {

    const todoListsData: Array<TodoListType> = [
        {
            id: v4(),
            title: "What to learn",
            filter: "All",
        },
        {
            id: v4(),
            title: "What to buy",
            filter: "All"
        }
    ];

    const itemsForTodoLists: TasksStateType = {
        [todoListsData[0].id]: [
            { id: v4(), title: "HTML&CSS", isDone: true },
            { id: v4(), title: "JS", isDone: true },
            { id: v4(), title: "React.js", isDone: true },
            { id: v4(), title: "Redux", isDone: false },
            { id: v4(), title: "typescript", isDone: false },
        ],
        [todoListsData[1].id]: [
            { id: v4(), title: "Bread", isDone: false },
            { id: v4(), title: "Milk", isDone: true },
            { id: v4(), title: "Meat", isDone: false },
            { id: v4(), title: "Fresh Water", isDone: true },
            { id: v4(), title: "Vegetables", isDone: false },
        ]
    };

    const [todos, dispatchTodos] = useReducer(todoListsReducer, todoListsData);
    const [tasks, dispatchTasks] = useReducer(tasksReducer, itemsForTodoLists);


    // Methods for tasks
    const addTask = (title: string, todoListId: string) => {
        dispatchTasks(addTaskAC(title, todoListId));
    }
    const removeTask = (id: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(id, todoListId));
    }
    const changeTaskStatus = (id: string, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(id, todoListId));
    }
    const changeTaskTitle = (id: string, title: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(id, todoListId, title));
    }

    // Methods for todolists
    const changeTodoListFilter = (todoListId: string, filterType: filterType) => {
        dispatchTodos(changeTodoListFilterAC(todoListId, filterType));
    }
    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatchTodos(changeTodoListTitleAC(todoListId, title));
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title);

        dispatchTodos(action);
        dispatchTasks(action);

    }


    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId);
        dispatchTodos(action);
        dispatchTasks(action);

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

                            let visibleData;

                            switch (todolist.filter) {
                                case "Active":
                                    visibleData = tasks[todolist.id].filter(item => !item.isDone)
                                    break;
                                case "Completed":
                                    visibleData = tasks[todolist.id].filter(item => item.isDone)
                                    break;
                                default:
                                    visibleData = tasks[todolist.id];
                            }

                            return (
                                <div></div>
                                // <Todolist
                                //     key={todolist.id}
                                //     todoListId={todolist.id}
                                //     title={todolist.title}
                                //     tasks={visibleData}
                                //     filter={todolist.filter}
                                //     addTask={addTask}
                                //     removeTask={removeTask}
                                //     changeTaskTitle={changeTaskTitle}
                                //     changeTaskStatus={changeTaskStatus}
                                //     changeTodoListFilter={changeTodoListFilter}
                                //     changeTodoListTitle={changeTodoListTitle}
                                //     removeTodoList={removeTodoList}
                                // />
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

