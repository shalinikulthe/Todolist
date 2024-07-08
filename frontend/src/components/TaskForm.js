import React, { useState } from "react";
import axios from "axios";
import "./taskcontainersty.css";

const TaskForm = ({ onTaskAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3004/tasks", {
        content,
      });
      setContent("");
      onTaskAdded(response.data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="task-form-container" style={{ marginBottom: "10px" }}>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter task content"
          required
        />
        <button
          type="submit"
          className="add-task-button"
          style={{ marginLeft: "10px" }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
