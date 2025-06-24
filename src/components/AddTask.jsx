import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("not-started");
  const [dueDate, setDueDate] = useState("");
  const user = auth.currentUser;
  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !dueDate) {
      alert("Please enter all fields!");
      return;
    }
    if (!user) {
      alert("You must be logged in to add a task.");
      return;
    }
    try {
      await addDoc(collection(db, `Users/${user.uid}/tasks`), {
        taskName,
        status,
        dueDate: Timestamp.fromDate(new Date(dueDate)),
        createdAt: Timestamp.now(),
      });

      alert("Task added successfully!");
      setTaskName("");
      setStatus("not-started");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Failed to add task!");
    }
  };

  const handleBackClick = () => {
    navigate("/userprofile");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-3 relative">
        <div
          onClick={handleBackClick}
          className="bg-[#202848] text-left text-white inline-flex items-center p-2 w-full cursor-pointer hover:bg-[#334977] transition duration-300 absolute top-0 left-0 rounded-t-2xl"
        >
          <FaArrowLeft className="text-lg mr-2" />
          <span>Back</span>
        </div>

        <h2 className="text-xl font-bold text-[#202848] mb-4 mt-12">
          Add Task
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 text-left">
            Task Name
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#202848]"
            placeholder="Enter task name"
          />

          <label className="block text-sm font-medium text-gray-700 mt-4 text-left">
            Task Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#202848]"
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mt-4 text-left">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#202848]"
          />

          <button
            type="submit"
            className="w-full bg-[#202848] text-white font-semibold py-2 mt-4 rounded-lg hover:bg-[#334977] transition duration-300"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
