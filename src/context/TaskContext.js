import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getData, saveData } from "../api";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const TaskContext = createContext();

function TaskContextProvider({ children }) {
  const { userId } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onAddTask = async (item) => {
    if (!item.label) toast.warning("please enter task name");
    else {
      const copyTaskList = [...taskList];
      copyTaskList.push({ ...item, dateOnPosted: new Date(), id: uuidv4() });
      setTaskList(copyTaskList);
      toast.success("Task added successfully");
      saveData(userId, copyTaskList);
      setOpenModal(false);
    }
  };

  const onEditTask = (item) => {
    const editedList = taskList.map((task) => {
      if (task.id === item.id) return item;
      else return task;
    });
    setTaskList(editedList);
    toast.success("Task edited successfully");
    setOpenModal(false);
    saveData(userId, editedList);
  };

  const onDeletTask = (item) => {
    const filteredTasks = taskList.filter((task) => task.id !== item.id);
    setTaskList(filteredTasks);
    toast.success("Task deleted successfully");
    saveData(userId, filteredTasks);
  };

  const fetchData = async (id) => {
    setLoading(true);
    getData(id)
      .then((data) => setTaskList(data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const value = {
    openModal,
    setOpenModal,
    taskList,
    onAddTask,

    onEditTask,
    onDeletTask,
    fetchData,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskContextProvider;

export const useTaskContext = () => {
  return useContext(TaskContext);
};
