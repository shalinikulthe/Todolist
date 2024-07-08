import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskContainer from "./components/taskcontainer";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3004/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <TaskContainer />
    </div>
  );
};

export default App;
