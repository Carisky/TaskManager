// ProjectsPage.jsx

import React, { useEffect, useState } from "react";
import PageLayout from "./PageLayout";
import { Typography, Table } from "antd";
import useTourLogic from "../../Hooks/useTourLogic";
import useTasksStore from "../../store/tasksStore";
import TasksService from "../../API/TasksService";
import ProjectsService from "../../API/ProjectsService";
import Progress from "../Components/Metrics/Progress";
import useProjectsStore from "../../store/projectsStore";
import { useTranslation } from "react-i18next";
const { Title } = Typography;

/**
 * Страница отображения проектов.
 * @component
 * @returns {JSX.Element} - Элемент компонента.
 */
const StatsPage = () => {
  const { tasks, setTasks } = useTasksStore();
  const { projects, setProjects } = useProjectsStore();
  const [doneTasks, setDoneTasks] = useState();
  const [expiredTasks, setExpiredTasks] = useState();
  const [tasksCount, setTasksCount] = useState();
  const [projectsCount, setProjectsCount] = useState();
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
    setTasksCount(tasks.length);
    const tmpDoneTasks = tasks.filter((item) => item.is_done == 1).length;
    const tmpExpiredTasks = tasks.filter(
      (item) => new Date(item.due_date) < new Date()
    ).length;
    setExpiredTasks(tmpExpiredTasks);
    setDoneTasks(tmpDoneTasks);
  }, [setTasks]);

  useEffect(() => {
    // Загрузка проектов при монтировании компонента
    async function fetchProjects() {
      try {
        const fetchedProjects = await ProjectsService.getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
    setProjectsCount(projects.length);
  }, [setProjects]);

  // Шаги тура по странице проектов
  const tourSteps = [{}];

  const dataSource = [
    {
      tasks_count: tasksCount,
      projects_count: projectsCount,
      done_tasks: doneTasks,
      expired_tasks: expiredTasks,
    },
  ];

  const columns = [
    {
      title: "Tasks Count",
      dataIndex: "tasks_count",
      key: "tasks_count",
    },
    {
      title: "Tasks Done",
      dataIndex: "done_tasks",
      key: "done_tasks",
    },
    {
      title: "Projects u have",
      dataIndex: "projects_count",
      key: "projects_count",
    },
    {
      title: "Expired tasks",
      dataIndex: "expired_tasks",
      key: "expired_tasks",
    },
  ];

  const { TourComponent } = useTourLogic(tourSteps);
  const { t } = useTranslation();
  return (
    <PageLayout>
      {/* Заголовок страницы */}
      <Title level={2} className="projects-title">
        {t("pages.statsPage.Title")}
      </Title>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
      <Progress
        label={"Tasks done "}
        color={"#4caf50"}
        max={tasksCount}
        done={doneTasks}
      />
      <Progress
        label={"Expired Tasks "}
        color={"#ba132c"}
        max={tasksCount}
        done={expiredTasks}
      />
      {/* Компонент тура */}
      <TourComponent />
    </PageLayout>
  );
};

export default StatsPage;
