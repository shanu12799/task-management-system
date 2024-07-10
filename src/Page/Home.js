import React, { useContext, useEffect, useState } from "react";
import CustomNavbar from "../component/CustomNavbar";
import CardsConatiner from "../component/CardsConatiner";
import { Button, SelectPicker } from "rsuite";
import CustomModal from "../component/CustomModal";
import { useTaskContext } from "../context/TaskContext";
import { FilterOptions, filteredList } from "../constant";
import { getUser } from "../api";
import { useAuth } from "../context/AuthContext";
import FilterInputSearch from "../component/FilterInputSearch";

const Home = () => {
  const {
    taskList,
    openModal,
    setOpenModal,
    onAddTask,
    onEditTask,
    fetchData,
  } = useTaskContext();
  const { userId } = useAuth();
  const [filterValue, setFilteValue] = useState("all");

  useEffect(() => {
    getUser(userId);
  }, []);
  useEffect(() => {
    const userId = localStorage.getItem("userID");
    fetchData(userId);
  }, []);

  return (
    <>
      <CustomNavbar />
      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FilterInputSearch
          filterValue={filterValue}
          setFilteValue={setFilteValue}
        />
        <Button
          appearance="primary"
          onClick={() => setOpenModal(true)}
          style={{ height: "30px" }}
        >
          Add task
        </Button>
      </div>
      <div style={{ width: "80%", margin: "auto", marginTop: "3rem" }}>
        <CardsConatiner
          data={
            filterValue?.toLowerCase() === "all"
              ? taskList
              : filteredList(filterValue, taskList)
          }
        />
      </div>
      <CustomModal
        open={openModal}
        onSuccess={(task) => onAddTask(task)}
        onEdit={(task) => onEditTask(task)}
        onHandelClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default Home;
