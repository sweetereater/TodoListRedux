import { TodoListType, FilterType } from '../AppWithRedux';
import { v1 } from 'uuid';

export type RemoveTodoList = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}

export type AddTodoList = {
    type: "ADD-TODOLIST"
    title: string
    id: string
}

export type changeTodoListFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    todoListId: string
    filter: FilterType
}

export type changeTodoListTitle = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListId: string
    title: string
}

export type actionType = RemoveTodoList |
    AddTodoList |
    changeTodoListFilter |
    changeTodoListTitle


export const todosInitialState: Array<TodoListType> = [
    {
        id: v1(),
        title: "What to learn",
        filter: "All",
    },
    {
        id: v1(),
        title: "What to buy",
        filter: "All"
    }
];

export const todoListsReducer = (todoLists: Array<TodoListType> = todosInitialState, action: actionType) => {
    switch (action.type) {

        case "REMOVE-TODOLIST":
            return todoLists.filter(tdList => tdList.id !== action.todoListId);

        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.id,
                title: action.title,
                filter: "All"
            }
            return [...todoLists, newTodoList]

        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(todo => {
                return todo.id === action.todoListId ? { ...todo, filter: action.filter } : todo;
            })

        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(todo => {
                return todo.id === action.todoListId ? { ...todo, title: action.title } : todo
            })

        default:
            return todoLists
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoList => {
    return {
        type: "REMOVE-TODOLIST",
        todoListId: todoListId
    }
}

export const addTodoListAC = (title: string): AddTodoList => {
    return {
        type: "ADD-TODOLIST",
        title: title,
        id: v1()
    }
}

export const changeTodoListTitleAC = (todoListId: string, title: string): changeTodoListTitle => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        todoListId: todoListId,
        title: title
    }
}

export const changeTodoListFilterAC = (todoListId: string, filter: FilterType): changeTodoListFilter => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        todoListId: todoListId,
        filter: filter
    }
}