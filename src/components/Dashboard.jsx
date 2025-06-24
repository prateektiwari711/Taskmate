import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user logged in.");
      setLoading(false);
      return;
    }

    console.log(`Fetching tasks for user: ${user.uid}`);
    const q = query(collection(db, `Users/${user.uid}/tasks`));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        console.log("No tasks found in Firestore.");
        setTasks([]);
        setLoading(false);
        return;
      }

      const taskList = snapshot.docs.map((doc) => {
        const taskData = doc.data();
        return {
          id: doc.id,
          ...taskData,
          dueDate: taskData.dueDate?.seconds
            ? new Date(taskData.dueDate.seconds * 1000)
            : null,
        };
      });

      setTasks(taskList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const taskRef = doc(db, `Users/${user.uid}/tasks`, taskId);
      await updateDoc(taskRef, { status: newStatus });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      console.log(`Task ${taskId} updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await deleteDoc(doc(db, `Users/${user.uid}/tasks`, taskId));

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      console.log(`Task ${taskId} deleted`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const sortTasksByDueDate = (tasks) =>
    tasks.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate - b.dueDate;
    });

  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const notStartedTasks = sortTasksByDueDate(
    filteredTasks.filter((task) => task.status === "not-started")
  );
  const inProgressTasks = sortTasksByDueDate(
    filteredTasks.filter((task) => task.status === "in-progress")
  );
  const completedTasks = sortTasksByDueDate(
    filteredTasks.filter((task) => task.status === "completed")
  );

  const TaskCard = ({ task }) => (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-between min-h-[150px] w-full sm:w-[90%]">
      <p className="font-medium text-lg text-center">{task.taskName}</p>
      <p className="text-sm text-gray-600 text-center">
        Due: {task.dueDate ? task.dueDate.toLocaleDateString() : "No Due Date"}
      </p>

      <select
        className="mt-3 p-2 border rounded w-full text-center bg-gray-100"
        value={task.status}
        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
      >
        <option value="not-started">To Start</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button
        className="mt-3 bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600 transition"
        onClick={() => deleteTask(task.id)}
      >
        🗑 Delete
      </button>
    </div>
  );

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />


      <div className="p-4 flex justify-center">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[90%] md:w-[50%] p-2 border rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

        <div className="bg-blue-200 p-4 text-center rounded-lg">
          <h2 className="text-lg font-semibold">To Start</h2>
          <div className="flex flex-col gap-3 overflow-auto max-h-[500px]">
            {notStartedTasks.length === 0 ? (
              <p className="text-gray-600">No tasks found</p>
            ) : (
              notStartedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>

        <div className="bg-green-200 p-4 text-center rounded-lg">
          <h2 className="text-lg font-semibold">In Progress</h2>
          <div className="flex flex-col gap-3 overflow-auto max-h-[500px]">
            {inProgressTasks.length === 0 ? (
              <p className="text-gray-600">No tasks found</p>
            ) : (
              inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>

        <div className="bg-yellow-200 p-4 text-center rounded-lg">
          <h2 className="text-lg font-semibold">Completed</h2>
          <div className="flex flex-col gap-3 overflow-auto max-h-[500px]">
            {completedTasks.length === 0 ? (
              <p className="text-gray-600">No tasks found</p>
            ) : (
              completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
