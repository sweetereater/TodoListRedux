import { tasksReducer } from "./tasks-reducer";
import { v1 } from 'uuid';
import { TasksStateType, TodoListType } from "../AppWithRedux";
import {
    removeTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC
} from './tasks-reducer';
import { addTodoListAC, todoListsReducer, removeTodoListAC } from "./todolists-reducer";

let startState: TasksStateType;
let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(() => {

    startState = {
        [todolistId1]: [
            { id: "1", title: "HTML&CSS", isDone: true },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React.js", isDone: true },
            { id: "4", title: "Redux", isDone: false },
            { id: "5", title: "typescript", isDone: false },
        ],
        [todolistId2]: [
            { id: "6", title: "Bread", isDone: false },
            { id: "7", title: "Milk", isDone: true },
            { id: "8", title: "Meat", isDone: false },
            { id: "9", title: "Fresh Water", isDone: true },
            { id: "10", title: "Vegetables", isDone: false },
        ]
    };
})

// тестируем работу удаления определенной таски из определенного листа
test('correct task should be removed', () => {

    const endState = tasksReducer(startState, removeTaskAC("6", todolistId2))

    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][0].id).toBe("7");
    expect(endState).toEqual({
        [todolistId1]: [
            { id: "1", title: "HTML&CSS", isDone: true },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React.js", isDone: true },
            { id: "4", title: "Redux", isDone: false },
            { id: "5", title: "typescript", isDone: false },
        ],
        [todolistId2]: [
            { id: "7", title: "Milk", isDone: true },
            { id: "8", title: "Meat", isDone: false },
            { id: "9", title: "Fresh Water", isDone: true },
            { id: "10", title: "Vegetables", isDone: false },
        ]
    })
})

// тестируем добавления таски в определенный лист
test('tesk add task reducer', () => {

    const newTaskTitle = "Biba + boba";
    const endState = tasksReducer(startState, addTaskAC(newTaskTitle, todolistId1));

    expect(endState[todolistId1].length).toBe(6);
    expect(endState[todolistId1][0].title).toBe('Biba + boba');
})


// Тестируем смену статуса таски
test('test change task status (isDone) ', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC("3", todolistId1));

    expect(endState[todolistId1][2].isDone).toBe(false);
})

// Тестируем смену тайтла таски
test('test changing task TITLE', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC("10", todolistId2, "grab some beer"))

    expect(endState[todolistId2][4].title).toBe("grab some beer");
})


// Тестируем Добавление нового Тудулиста -> должнен быть добавлен пустой массив в тасках для него
test('test adding new todolist', () => {

    const startTodoListState: Array<TodoListType> = [
        { id: todolistId1, title: "What to learn", filter: "All" },
        { id: todolistId2, title: "What to buy", filter: "All" },
    ];

    const action = addTodoListAC("what to drink");

    const endTaskState = tasksReducer(startState, action)
    const endTodoListsState = todoListsReducer(startTodoListState, action);

    expect(Object.keys(endTaskState).length).toBe(3);
})

// Тестируем удаление Тудулиста + удаление массива Тасок для него 

test('test deleting addTodoList and corresponding tasks', () => {



    const endTasksState = tasksReducer(startState, removeTodoListAC(todolistId1));

    expect(Object.keys(endTasksState).length).toBe(1);

})