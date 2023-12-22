export default class Model {
    constructor() {
        this.view = null
        this.todos = JSON.parse(localStorage.getItem('todos'))
        if (!this.todos || this.todos.length < 1) {
            this.todos = [
                {
                    id: 0,
                    name: "Axel",
                    task: "jugar lol",
                    completed: true,
                }
            ]
            this.currenId = 1
        } else {
            this.currenId = this.todos[this.todos.length - 1].id +1
        }
    }

    editTodo(id, values){
        const index = this.findIndexTodo(id)
        // this.todos[index] = {id, ...values}
        // haciendolo con assing, en assign no se pone ...
        Object.assign(this.todos[index], values)
        console.log(values)
        this.save()
    }
    setView(view) {
        this.view = view
    }

    setTodos(todos) {
        this.todos = todos
    }

    getTodos() {
        return this.todos.map((todo) => ({...todo}))
    }

    findIndexTodo(id) {
        // manera javascriptiense
        return this.todos.findIndex((todo) => todo.id === id)
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }


    toggleCompleted(id) {
        const index = this.findIndexTodo(id)
        const todo = this.todos[index]
        todo.completed = !todo.completed
        this.save()
    }
    removeTodo(id) {
        const index = this.findIndexTodo(id)
        console.log(this.todos[index])
        // tambien se podria hacer con pop
        this.todos.splice(index, 1)
        this.save()
        // esto seria como hacerlo en java
        // for (let index = 0; index < this.todos.length; index++) {
        //     if (this.todos[index].id === id ){
        //         this.todos.pop(index)
        //         return
        //     }
        // }
    }

    addTodo(name, task) {
        const todo = {
            id: this.currenId++,
            // name : name,
            // si la propiedad es la misma que su valor se puede poner el nombre de la propiedad / valor y ya xd
            name,
            task: task,
            completed: false,
        }

        this.todos.push(todo)
        console.log(this.todos)

        this.save()
        return { ...todo }
    }
}