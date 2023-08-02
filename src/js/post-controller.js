export default class PostController {
  constructor(PostService) {
    this._PostService = PostService
    this._inputField = document.querySelector('input.todosInputFilter')
    this._container = document.querySelector('ul.todosContainer')
    this._todos = []
    this._filteredTodos = []
  }

  async loadTodos() {
    const response = await this._PostService.fetchTodos()

    /*
    * Disable TodosInpufField and hides UL(css)
    * Returns to prevent rendering empty todos.
    */
    if(!response.issuccess) {
      this._disableTodosComponent()
      return
    }

    this._todos = response.data
    this._renderTodos(this._todos)
  }

  /*
  * Sort Todos by Title length.
  * Checks if current todos is already filtered or not.
  * Will sort the filteredTodos if true.
  */
  sortTodos() {
    const sortedTodos = this._filteredTodos.length > 0 ?
      this._filteredTodos.sort((todo, nextTodo) => todo.title.length - nextTodo.title.length)
      : this._todos.sort((todo, nextTodo) => todo.title.length - nextTodo.title.length)

    this._renderTodos(sortedTodos)
  }

  // Handles filtering for the Todos.
  filterTodos(filterValue) {
    this._filteredTodos = this._todos.filter(todo => todo.title.includes(filterValue))
    this._renderTodos(this._filteredTodos)
  }

  _disableTodosComponent() {
    this._container.classList.add('hidden') // TODO: Add Hidden Class to the UL element.
    this._inputField.disabled = true
  }

  _renderTodos(todos) {
    /*
    * Initiially resets the container.
    * This is used when filtering Todos as we need to re-render filtered Todos.
    */
    this._container.innerHTML = ''

    /*
    * Renders Todo List: append LI to listContainer
    * Used Index as an ID for each List Item
    */
    todos.forEach((todo, index) => {
      this._container.innerHTML += `
        <li id=${index+1}>
          <p><span>(Length: ${todo.title.length})</span> ${todo.title}</p>
          <p>${todo.completed ? '🏁' : '🚧'}</p>
        </li>
      `
    })
  }
}
