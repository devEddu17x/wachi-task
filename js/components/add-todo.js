import Alert from "./alert.js"

export default class AddTodo {
    constructor() {
        this.btn = document.getElementById('add')
        this.name = document.getElementById('name')
        this.task = document.getElementById('task')
        this.Alert = new Alert('alert')
    }

    onClick(callback) {
        this.btn.onclick = () => {
            if (this.name.value.trim() === '') {
                this.Alert.show("Can not entry empty name or task")
                return
            }
            if (this.task.value.trim() === '') {
                this.Alert.show("Can not entry empty name or task")
                return
            }

            this.Alert.hide()

            // esta funcion nos la han pasado, aqui es donde finalmente se ejecuta
            callback(this.name.value, this.task.value)
        }
    }
}