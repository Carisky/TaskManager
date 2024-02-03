import React, { useState } from "react";
import { List, Typography, notification, Switch } from "antd";
import {
  InfoCircleOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import TaskForm from "../forms/TaskForm";
import moment from "moment";
import TasksService from "../../API/TasksService";
import useTasksStore from "../../store/tasksStore";
import styles from "./TaskStyles.module.css"
/**
 * Компонент представления задачи с возможностью редактирования и удаления.
 * @component
 * @param {Object} task - Данные о задаче.
 * @returns {JSX.Element} - Элемент компонента.
 */
export default function Task({ task }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { tasks, setTasks } = useTasksStore();

  /**
   * Обработчик открытия модального окна для редактирования задачи.
   * @function
   */
  const handleEditClick = () => {
    setEditModalVisible(true);
  };

  /**
   * Обработчик закрытия модального окна редактирования.
   * @function
   */
  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  /**
   * Обработчик изменения статуса задачи.
   * @async
   * @function
   */
  const handleChangeTaskStatus = async () => {
    try {
      const changeResult = await TasksService.changeTaskStatus(task.id);

      if (changeResult.success) {
        const updatedTaskIndex = tasks.findIndex((obj) => obj.id === task.id);

        if (updatedTaskIndex !== -1) {
          // Replace the old task with the updated task
          const updatedTasks = [...tasks];
          updatedTasks[updatedTaskIndex] = changeResult.data;

          setTasks(updatedTasks);

          notification.success({
            message: "Task Status changed",
            description: "The task has been changed successfully.",
            duration: 3,
          });
        }
      } else {
        notification.error({
          message: "Error",
          description: changeResult.message,
          duration: 3,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Рендер цвета индекатора
   * @function
   */
  const getPriorityColor = () => {
    switch (task.priority) {
      case 1:
        return "green";
      case 2:
        return "yellow";
      case 3:
        return "red";
      default:
        return "black"; // default color or any other fallback
    }
  };

  /**
   * Обработчик удаления задачи.
   * @async
   * @function
   */
  const handleDeleteClick = async () => {
    try {
      const deleteResult = await TasksService.deleteTask(task.id);

      if (deleteResult.success) {
        const updatedTasks = tasks.filter((obj) => obj.id !== task.id);
        setTasks(updatedTasks);

        notification.success({
          message: "Task Deleted",
          description: "The task has been deleted successfully.",
          duration: 3,
        });
      } else {
        notification.error({
          message: "Error",
          description: deleteResult.message,
          duration: 3,
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error",
        description: "An error occurred while deleting the task.",
        duration: 3,
      });
    }
  };

  return (
    <>
      <List.Item className={styles.wrapper}>
        <div className={styles.wrapper} >
          <div className={`${styles.priorityIndicator} ${styles[getPriorityColor()]}`}/>        
        </div>

        <div className={styles.wrapper}>{task.title}</div>

        <div className={styles.wrapper}>
          <Typography.Text>
            {moment(task.due_date).format("YYYY-MM-DD HH:mm")}
          </Typography.Text>
        </div>

        <div className={styles.wrapper}>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={handleChangeTaskStatus}
            checked={task.is_done}
          />
        </div>

        <div className={styles.wrapper}>
          <div style={{ width: "60px", display: "flex", justifyContent: "space-around" }}>
            <InfoCircleOutlined className={`${styles["info-show"]} info-show`} onClick={handleEditClick} />
            <DeleteOutlined className={`${styles["delete-show"]} delete-show`} onClick={handleDeleteClick} />
          </div>
        </div>
      </List.Item>

      <TaskForm
        visible={editModalVisible}
        onCancel={handleEditCancel}
        initialData={task}
        mode="edit"
      />
    </>
  );
}
