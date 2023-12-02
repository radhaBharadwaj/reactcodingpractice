import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import TagButton from './components/TagButton'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    task: '',
    option: tagsList[0].optionId,
    tasksList: [],
    activeTag: 'INITIAL',
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onChangeOptionS = event => {
    this.setState({option: event.target.value})
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {task, option} = this.state
    const newTask = {
      task,
      option: option.toUpperCase(),
      id: uuidv4(),
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      task: '',
      option: tagsList[0].optionId,
    }))
  }

  tagClicked = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {task, option, tasksList, activeTag} = this.state
    console.log(option)

    const filteredTasks =
      activeTag === 'INITIAL'
        ? tasksList
        : tasksList.filter(each => each.option === activeTag)

    return (
      <div>
        <div>
          <h1>Create a Task!</h1>
          <form onSubmit={this.onSubmitTask}>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              placeholder="Enter the task here"
              id="task"
              onChange={this.onChangeTask}
              value={task}
            />
            <label htmlFor="tags">Tags</label>
            <select onChange={this.onChangeOptionS} value={option} id="tags">
              {tagsList.map(each => (
                <option key={each.optionId}>{each.displayText}</option>
              ))}
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div>
          <h1>Tags</h1>
          <ul>
            {tagsList.map(each => (
              <li key={each.optionId}>
                <button
                  type="button"
                  value={each.optionId}
                  onClick={this.tagClicked}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>
          <div>
            <h1>Tasks</h1>
            {tasksList.length < 1 ? (
              <p>No Tasks Added Yet</p>
            ) : (
              <ul>
                {filteredTasks.map(each => (
                  <li key={each.id}>
                    <p>{each.task}</p>
                    <p>{each.option}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
