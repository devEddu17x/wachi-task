import AddTodo from "./components/add-todo.js"
import Modal from "./components/modal.js"
import Filters from "./components/filters.js"

// por lo que he estado viendo normalmente importas y luego instancias al igual que en java normal 
export default class View {
    constructor() {
        this.model = null
        this.table = document.getElementById('table')
        this.AddTodoForm = new AddTodo()
        this.modal = new Modal()
        this.filters = new Filters()
        // funcion extra por si acaso, estos no se obtienen aqui, sino en el lugar final donde se ejecuta
        this.AddTodoForm.onClick((name, task) => {
            this.addTodo(name, task)
        })

        this.modal.onClick((id, values) => this.editTodo(id, values))

        this.filters.onClick((filters) => this.filter(filters));


    }

    setModel(model) {
        this.model = model
    }
    removeTodo(id) {
        // model tiene la base de datos por lo tanto hay que borrarlo de ahi tambien
        this.model.removeTodo(id)
        document.getElementById(id).remove()
    }
    addTodo(name, task) {
        // designamos al modelo que haga su funcion de add todo
        const todo = this.model.addTodo(name, task)
        this.createRow(todo)
    }

    editTodo(id, values) {
        // console.log(id,values)
        // console.log("introduciendo edit todo al midal")
        // this.model.editTodo(id, values)
        // vamos a ver si la vista se actualiza correctamente
        const row = document.getElementById(id)
        row.children[0].innerText = values.name
        row.children[1].innerText = values.task
        row.children[2].children[0].checked = values.completed
        this.model.editTodo(id, values)
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id)
    }

    render() {
        const todos = this.model.getTodos()
        todos.forEach((todo) => this.createRow(todo))
    }

    filter(filters) {
        const { type, words } = filters
        // manera mas hacker y pro
        // el _, indica el primer elemento y que no lo queremos el resto es ...rows
        const [_, ...rows] = document.getElementsByTagName('tr')

        for (const row of rows) {
            // console.log(row)
            // me quedare con los primeros 3 elementos ya que la lista tiene 4 pero nuestro const [] tiene 4
            const [name, task, completed] = row.children
            // no termine de entenderle a esta variable
            let shouldHide = false
            if (words) {
                // includes es como el in en python if not word in oracion:
                shouldHide = !name.innerText.includes(words.trim()) && !task.innerText.includes(words.trim())
            }

            const shouldBeCompleted = type === 'completed'
            const isCompleted = completed.children[0].checked

            if (type !== 'all' && shouldBeCompleted !== isCompleted) {
                shouldHide = true
            }

            if (shouldHide){
                row.classList.add('d-none')
            }else{
                row.classList.remove('d-none')
            }
            console.log(row, shouldHide)
        }


        // tag name -> significa que puedo agarrar por ejemplo tr
        // const rows = document.getElementsByTagName('tr')

        // aqui hay un problema y es que tambien nos da la primer tr que es la cabecera
        // se podria hacer por indices desde el 1 (ya que la cabecera es el 0) hasta el final
        // for (const row of rows){
        //     console.log(row)
        // }


    }
    createRow(todo) {

        const row = table.insertRow()

        row.setAttribute('id', todo.id)
        row.innerHTML = `
        <td> ${todo.name} </td>
        <td> ${todo.task} </td>
        <td class="text-center">

              </td>
              <td class="text-right">
                
              </td>
        `;

        // ya no se puede añadir en el html el checkbox
        // hay que hacerlo manualmente

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed
        checkbox.onclick = () => {
            this.toggleCompleted(todo.id)
        }
        row.children[2].appendChild(checkbox)

        // boton de editar

        const editBtn = document.createElement('button')
        editBtn.classList.add('btn', 'btn-primary', 'mb-1')
        editBtn.innerHTML = `<i class = "fa fa-pencil"> </i>`
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues(
            {
                id: todo.id,
                name: row.children[0].innerText,
                task: row.children[1].innerText,
                completed: row.children[2].children[0].checked,
            }
        )

        row.children[3].appendChild(editBtn)

        const removeBtn = document.createElement('button')
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1')
        removeBtn.innerHTML = `<i class = "fa fa-trash"> </i>`
        removeBtn.onclick = () => this.removeTodo(todo.id)
        // tambien se podria hacer getAttribute pero mejor obtener directamente el id del todo
        console.log(todo.id)

        row.children[3].appendChild(removeBtn)
    }
}