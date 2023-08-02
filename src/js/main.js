import CreatePostController from './factory.js'

const apiURL = 'https://jsonplaceholder.typicode.com/todos'
const dataLimit = 15

const postController = CreatePostController(apiURL, dataLimit)
postController.loadTodos()

/*
* EVENT LISTENERS for data filtering and sorting.
*/
const todosInputFilter = document.querySelector('input.todosInputFilter')
todosInputFilter.addEventListener('keyup', e => postController.filterTodos(e.target.value))

const todosSortButton = document.querySelector('button.todosSortButton')
todosSortButton.addEventListener('click', () => postController.sortTodos())
