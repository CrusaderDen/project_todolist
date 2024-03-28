//----remove
import {v1} from "uuid";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be remove', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Next JS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Эклерчики', isDone: true},
            {id: v1(), title: 'Пивко', isDone: false},
            {id: v1(), title: 'Чипсы', isDone: true},
        ],
    }


    // const RemoveTaskAction = {
    //     type: 'REMOVE-TASK' as const,
    //     todolistId: todolistId2,
    //     taskId: startState[todolistId2][2].id
    // }

    const endState = tasksReducer(startState, RemoveTaskAC(todolistId2, startState[todolistId2][2].id))

    expect(endState[todolistId1].length).toBe(5)
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId2][0].title).toBe('Эклерчики')
    expect(endState[todolistId2][1].title).toBe('Пивко')

})

//add---------------------

test('correct task should be add', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Next JS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Эклерчики', isDone: true},
            {id: v1(), title: 'Пивко', isDone: false},
            {id: v1(), title: 'Чипсы', isDone: true},
        ],
    }

    const newTitle = 'Сухарики'

    // const AddTaskAction = {
    //     type: 'ADD-TASK' as const,
    //     todolistId: todolistId2,
    //     title: newTitle
    // }

    const endState = tasksReducer(startState, AddTaskAC(todolistId2, newTitle))

    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].title).toBe(newTitle)
    expect(endState[todolistId2][3].title).toBe('Чипсы')
})

//change title-----------------

test('correct task should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Next JS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Эклерчики', isDone: true},
            {id: v1(), title: 'Пивко', isDone: false},
            {id: v1(), title: 'Чипсы', isDone: true},
        ],
    }

    const newTitle = 'Сухарики'

    // const ChangeTaskTitleAction = {
    //     type: 'CHANGE-TASK-TITLE',
    //     todolistId: todolistId2,
    //     taskId: startState[todolistId2][0].id,
    //     title: newTitle,
    //
    // }

    const endState = tasksReducer(startState, ChangeTaskTitleAC(todolistId2, startState[todolistId2][0].id, newTitle))

    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][0].title).toBe(newTitle)
})

//change status-----------------

test('correct status of task should be mount', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Next JS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Эклерчики', isDone: true},
            {id: v1(), title: 'Пивко', isDone: false},
            {id: v1(), title: 'Чипсы', isDone: true},
        ],
    }
    const isDone = false

    // const ChangeTaskStatusAction = {
    //     type: 'CHANGE-TACK-STATUS',
    //     todolistId: todolistId2,
    //     taskId: startState[todolistId2][0].id,
    //      isDone: isDone
    // }
    const endState = tasksReducer(startState, ChangeTaskStatusAC(todolistId2, startState[todolistId2][0].id, isDone))

    expect(endState[todolistId2][0].isDone).toBe(isDone)
})