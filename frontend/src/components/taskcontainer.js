import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa"; // Importing icons from react-icons
import "./taskcontainersty.css";
//container file

const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3004/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3004/delete/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleEditSubmit = async (updatedTask) => {
    try {
      const response = await axios.put(
        `http://localhost:3004/update/${updatedTask.id}`,
        updatedTask
      );
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? response.data : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post("http://localhost:3004/tasks", newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleTaskEdit = (task) => {
    if (editingTask && editingTask.id === task.id) {
      return (
        <div className="edit-form">
          <input
            type="text"
            value={editingTask.content}
            onChange={(e) =>
              setEditingTask({ ...editingTask, content: e.target.value })
            }
          />
          <button onClick={() => handleEditSubmit(editingTask)}>
            <FaSave />
          </button>
          <button onClick={handleCancelEdit}>
            <FaTimes />
          </button>
        </div>
      );
    } else {
      return (
        <div className="task-content">
          {task.content}
          <div className="task-icons">
            <FaEdit onClick={() => handleEdit(task)} className="edit-icon" />
            <FaTrash
              onClick={() => handleDelete(task.id)}
              className="delete-icon"
            />
          </div>
        </div>
      );
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.content.toLowerCase().includes(searchTerm.toLowerCase())
 );

  return (
    <div className="task-container">
      <div className="task-header">
        <h2 style={{ marginLeft: "40px", color: "#9327b1" }}>Task List</h2>
        <div className="action-buttons">
          <TaskForm onTaskAdded={handleAddTask} />
        </div>
      </div>
      <ol className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={task.id}>{handleTaskEdit(task)}</li>
        ))}
      </ol>
    </div>
  );
};

export default TaskContainer;
