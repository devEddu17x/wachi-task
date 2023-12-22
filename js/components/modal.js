import Alert from "./alert.js"

export default class Modal {
    constructor() {
        this.name = document.getElementById('modal-title');
        this.task = document.getElementById('modal-description');
        this.btn = document.getElementById('modal-btn');
        this.completed = document.getElementById('modal-completed');
        this.alert = new Alert('modal-alert');
    
        this.todo = null;
      }
    
      setValues(todo) {
        this.todo = todo;
        this.name.value = todo.name;
        this.task.value = todo.task;
        this.completed.checked = todo.completed;
      }
    
      onClick(callback) {
          this.btn.onclick = () => {
              console.log("entre a save y voy evaluar")
          if (!this.name.value || !this.task.value) {
            console.log("entre en el if")
            this.alert.show('Name and task are required');
            return;
          }
          
          $('#modal').modal('toggle');
    
          callback(this.todo.id, {
            name: this.name.value,
            task: this.task.value,
            completed: this.completed.checked,
          });
        }
      }

}