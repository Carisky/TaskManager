import React, { useState, useEffect } from "react";
import { List, Collapse, Typography, Button } from "antd";
import TaskForm from "../forms/TaskForm";
import useTasksStore from "../../store/tasksStore";
import Task from "./Task";
import TasksService from "../../API/TasksService";
import { InfoCircleOutlined } from "@ant-design/icons";
import ProjectForm from "../forms/ProjectForm";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

/**
 * Компонент представления проекта с возможностью добавления задач.
 * @component
 * @param {Object} project - Данные о проекте.
 * @returns {JSX.Element} - Элемент компонента.
 */
export default function Project({ project }) {
  const { tasks, setTasks } = useTasksStore();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const {t} = useTranslation();
  /**
   * Загружает задачи при монтировании компонента.
   */
  useEffect(() => {
    async function fetchTasks() {
      try {
        const fetchedTasks = await TasksService.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTasks();
  }, [setTasks]);
  /**
   * Обработчик открытия модального окна для добавления задачи.
   * @function
   */
  const handleAddTask = () => {
    setModalVisible(true);
  };

  /**
   * Обработчик закрытия модального окна.
   * @function
   */
  const handleCancel = () => {
    setModalVisible(false);
  };

  /**
   * Обработчик открытия модального окна для добавления задачи.
   * @function
   */
  const handleEditProject = () => {
    setEditModalVisible(true);
  };

  /**
   * Обработчик закрытия модального окна.
   * @function
   */
  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  /**
   * Обработчик завершения формы добавления задачи.
   * @function
   * @param {Object} values - Введенные значения формы.
   */
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <List.Item>
      <Collapse style={{ width: "100%" }} defaultActiveKey={["0"]}>
        <Panel
          className="project"
          header={
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {project.title}

                <ProjectForm
                  mode="edit"
                  initialData={project}
                  onCancel={handleEditCancel}
                  visible={isEditModalVisible}
                />
              </div>
            </div>
          }
          key="1"
        >
          <Typography>{project.description}</Typography>

          <TaskForm
            className="add-to-project"
            projectId={project.id}
            visible={isModalVisible}
            onCancel={handleCancel}
            mode="addToProject"
          />

          <List
            dataSource={tasks.filter((task) => task.project_id === project.id)}
            renderItem={(task) => (
              <List.Item key={task.id}>
                <Task task={task} />
              </List.Item>
            )}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                width: "30%",
              }}
              className="tasks-add"
              type="primary"
              onClick={handleAddTask}
            >
              {t("components.Project.Add Task Button")}
            </Button>
            <InfoCircleOutlined onClick={handleEditProject} />
          </div>
        </Panel>
      </Collapse>
    </List.Item>
  );
}
