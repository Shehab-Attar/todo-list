import { useState, useEffect } from "react"
import '../src/index.css'
function ToDoList(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState([])


    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            console.log("Loaded tasks from localStorage:", savedTasks);
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
    }, [tasks]);

    function handleInputChange(e){
        setNewTask(e.target.value)
        
    }  
    
    function addTask () {
        if (newTask.trim() !== ''){
      setTasks(t => [...t, newTask])
      setNewTask("")
        }
    }

    function removeTask (index) {
      const updatedTasks = tasks.filter((_,i)=> i !== index);
      setTasks(updatedTasks);

    }

    function moveTaskUp(index) {
        if(index >0){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index -1]] = 
            [updatedTasks[index - 1 ],updatedTasks[index]]
            setTasks(updatedTasks);
        }
    }
    function moveTaskDown(index) {
        if(index < tasks.length -1){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index +1]] =
            [updatedTasks[index + 1 ],updatedTasks[index]] 
            setTasks(updatedTasks);
        } 

    }

    return (
        <>
            <div className="container d-flex vh-100">
                <div className="card text-center" style={{ margin: 'auto' }}>
                    <h2 className="card-header">To Do List App</h2>
                    <div className="card-body">
                        <div className="input-container">
                            <input
                            type="text"
                            id="new-task"
                            placeholder="Add a new task..."
                            value={newTask}
                            onChange={handleInputChange}
                            />
                            <button id="add-task" className="add-button btn btn-success" onClick={addTask}>
                                <img src="../src/assets/plusss.png" alt="Add" />
                            </button>
                        </div>
                        <ul id="task-list">
                            {tasks.map((task, index) => (
                                <li key={index} className="bg-light mt-2 mb-2 fluid">
                                    <span className="text">{task}</span>
                                        <div className="list-item">
                                            <span></span>
                                            <button className="delete-button btn btn-outline-danger btn-sm" onClick={() => removeTask(index)}>
                                            Delete
                                            </button>
                                            <button className="up-button btn btn-outline-warning btn-sm" onClick={() => moveTaskUp(index)}>
                                            Up
                                            </button>
                                            <button className="down-button btn btn-outline-warning btn-sm" onClick={() => moveTaskDown(index)}>
                                            Down
                                            </button>
                                        </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h5 className="card-footer">© Shehab</h5>
                </div>
            </div>
        </>
    )
}

export default ToDoList