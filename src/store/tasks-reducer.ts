import { v1 } from 'uuid';
import { TasksStateType } from '../AppWithRedux';
import { TaskType } from '../Components/Todolist';
import { AddTodoList, RemoveTodoList } from './todolists-reducer';
import { todosInitialState } from './todolists-reducer';

const REMOVE_TASK = "REMOVE-TASK";
const ADD_TASK = "ADD-TASK"
const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"
const CREATE_TASKS_FOR_NEW_TODOLIST = "ADD-TODOLIST"
const DELETE_TASKS = "DELETE-TASKS"

export type RemoveTask = {
    type: typeof REMOVE_TASK
    taskId: string
    todoListId: string
}

export type AddTask = {
    type: typeof ADD_TASK
    title: string
    todoListId: string
}

export type ChangeTaskStatus = {
    type: typeof CHANGE_TASK_STATUS
    taskId: string
    todoListId: string
}

export type ChangeTaskTitle = {
    type: typeof CHANGE_TASK_TITLE
    taskId: string
    todoListId: string
    title: string
}

export type CreateTasksForNewTodoList = {
    type: typeof CREATE_TASKS_FOR_NEW_TODOLIST
    todoListId: string
}

export type DeleteTasks = {
    type: typeof DELETE_TASKS
    todoListId: string
}



export type actionType = RemoveTask |
    AddTask |
    ChangeTaskStatus |
    ChangeTaskTitle | RemoveTodoList | AddTodoList



const initialState = {
    [todosInitialState[0].id]: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React.js", isDone: true },
        { id: v1(), title: "Redux", isDone: false },
        { id: v1(), title: "typescript", isDone: false },
    ],
    [todosInitialState[1].id]: [
        { id: v1(), title: "Bread", isDone: false },
        { id: v1(), title: "Milk", isDone: true },
        { id: v1(), title: "Meat", isDone: false },
        { id: v1(), title: "Fresh Water", isDone: true },
        { id: v1(), title: "Vegetables", isDone: false },
    ]
};



export const tasksReducer = (state: TasksStateType = initialState, action: actionType) => {
    switch (action.type) {

        case REMOVE_TASK:
            return { ...state, [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId) }

        case ADD_TASK:
            const newTodoTaskId = v1();
            const newTask: TaskType = {
                id: newTodoTaskId,
                title: action.title,
                isDone: false

            }
            return { ...state, [action.todoListId]: [newTask, ...state[action.todoListId]] };

        case CHANGE_TASK_STATUS:

            return { ...state, [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? { ...task, isDone: !task.isDone } : task) };

        case CHANGE_TASK_TITLE:
            return { ...state, [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? { ...task, title: action.title } : task) }

        case "ADD-TODOLIST":
            return { ...state, [action.id]: [] };

        case "REMOVE-TODOLIST":
            const stateCopy = { ...state };
            delete stateCopy[action.todoListId];
            return stateCopy;

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTask => {
    return {
        type: REMOVE_TASK,
        taskId: taskId,
        todoListId: todoListId
    }
}

export const addTaskAC = (title: string, todoListId: string): AddTask => {
    return {
        type: ADD_TASK,
        title: title,
        todoListId: todoListId
    }
}

export const changeTaskStatusAC = (taskId: string, todoListId: string): ChangeTaskStatus => {
    return {
        type: CHANGE_TASK_STATUS,
        taskId: taskId,
        todoListId: todoListId
    }
}

export const changeTaskTitleAC = (taskId: string, todoListId: string, title: string): ChangeTaskTitle => {
    return {
        type: CHANGE_TASK_TITLE,
        taskId: taskId,
        todoListId: todoListId,
        title: title
    }
}

