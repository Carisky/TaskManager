// TasksPage.jsx

import React, { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import TaskForm from '../forms/TaskForm';
import { Button, Typography, Divider, List, Pagination, Input, Select } from 'antd';
import useTourLogic from '../../Hooks/useTourLogic';
import TasksService from '../../API/TasksService';
import Task from '../Components/Task';
import useTasksStore from '../../store/tasksStore';
import ListHeader from '../Components/ListHeader';
import { useTranslation } from "react-i18next";
const { Title } = Typography;
const tourSteps = [
  {
    selector: ".tasks-list",
    content: "Here u can see your Tasks!",
  },
  {
    selector: ".tasks-add",
    content: "Here u can add Task!",
  },
  {
    selector: ".tasks-search",
    content: "Here u can seacrh Tasks!",
  },
  {
    selector: ".tasks-time-filter",
    content: "Here u filter tasks by tyme!",
  },
  {
    selector: ".info-show",
    content: "Here u can see all info about task and edit it!",
  },
  {
    selector: ".delete-show",
    content: "Here u can delete task!",
  },
];
/**
 * Компонент страницы задач.
 * Отображает список задач с возможностью фильтрации, поиска и добавления новой задачи.
 *
 * @component
 * @example
 * // Импорт компонента
 * import TasksPage from "./UI/Pages/TasksPage";
 *
 * // Использование компонента
 * <TasksPage />
 */
const TasksPage = () => {
  const { tasks, setTasks } = useTasksStore();
  const { TourComponent } = useTourLogic(tourSteps);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [timeFilter, setTimeFilter] = useState('week');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Количество задач на странице
  const {t} = useTranslation();
  const TaskPageTableHeaders = [
    t("pages.tasksPage.TaskPageTableHeaders.Priority"),
    t("pages.tasksPage.TaskPageTableHeaders.Task Title"),
    t("pages.tasksPage.TaskPageTableHeaders.Due Date"),
    t("pages.tasksPage.TaskPageTableHeaders.Is Done"),
    t("pages.tasksPage.TaskPageTableHeaders.Actions"),
  ]
 

  /**
   * Обработчик изменения страницы.
   * @param {number} page - Номер выбранной страницы.
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
   * Рассчитывает начальный и конечный индексы для текущей страницы.
   * @type {number}
   */
   const startIndex = (currentPage - 1) * pageSize;
   const endIndex = startIndex + pageSize;
   const paginatedTasks = tasks.slice(startIndex, endIndex);

  /**
   * Фильтрует задачи в соответствии с критериями поиска.
   * @param {Object} task - Задача для фильтрации.
   * @returns {boolean} - Возвращает true, если хотя бы один из критериев совпадает.
   */
  const filterTasks = (task) => {
    const lowerSearchTitle = searchTitle.toLowerCase();

    const titleMatch = task.title && task.title.toLowerCase().includes(lowerSearchTitle);
    const descriptionMatch = task.description && task.description.toLowerCase().includes(lowerSearchTitle);
    const tagsMatch = task.tags && task.tags.toLowerCase().includes(lowerSearchTitle);
    const priorityMatch = task.priority && task.priority.toString() === lowerSearchTitle;

    return titleMatch || descriptionMatch || tagsMatch || priorityMatch;
  };

  /**
   * Фильтрует задачи в соответствии с временным интервалом.
   * @param {Object} task - Задача для фильтрации по времени.
   * @returns {boolean} - Возвращает true, если задача попадает в выбранный временной интервал.
   */
  const filterByTime = (task) => {
    const currentDate = new Date();
    const taskDate = new Date(task.due_date);

    switch (timeFilter) {
      case 'day':
        return taskDate.getDate() === currentDate.getDate();
      case 'week':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return taskDate >= weekStart && taskDate <= weekEnd;
      case 'month':
        return taskDate.getMonth() === currentDate.getMonth();
      default:
        return true; // По умолчанию возвращаем true, если нет конкретного фильтра
    }
  };

  /**
   * Обработчик добавления новой задачи.
   */
  const handleAddTask = () => {
    setModalVisible(true);
  };

  /**
   * Обработчик отмены добавления новой задачи.
   */
  const handleCancel = () => {
    setModalVisible(false);
  };

  /**
   * Отображение компонента.
   */
  return (
    <PageLayout>
      <Title level={2}>{t("pages.tasksPage.Title")}</Title>
      <div
        style={{
          display: 'flex',
        }}
      >
        <Input
          className="tasks-search"
          placeholder="Поиск по названию, описанию, тегам или приоритету"
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <Select
          className="tasks-time-filter"
          value={timeFilter}
          onChange={(value) => setTimeFilter(value)}
          style={{ width: 120, marginLeft: 10 }}
        >
          <Option value="day">{t("pages.tasksPage.Date Filter Options.day")}</Option>
          <Option value="week">{t("pages.tasksPage.Date Filter Options.week")}</Option>
          <Option value="month">{t("pages.tasksPage.Date Filter Options.month")}</Option>
        </Select>
      </div>
      <Divider />
      <List
        className="tasks-list"
        header=<ListHeader items={TaskPageTableHeaders}/>
        footer={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Pagination
              current={currentPage}
              total={tasks.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              style={{ marginTop: '20px', textAlign: 'center' }}
            />
            <Button
              style={{
                marginTop: '20px',
                width: '30%',
              }}
              className="tasks-add"
              type="primary"
              onClick={handleAddTask}
            >
              {t("pages.tasksPage.Add Task Button")}
            </Button>
          </div>
        }
        bordered
        dataSource={paginatedTasks.filter(filterTasks).filter(filterByTime)}
        renderItem={(item) => <Task task={item} />}
      />

      <TaskForm visible={isModalVisible} onCancel={handleCancel} mode="add" />
      {/* Тур по странице */}
      <TourComponent />
    </PageLayout>
  );
};

export default TasksPage;
