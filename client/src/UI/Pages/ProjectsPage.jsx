// ProjectsPage.jsx

import React, { useEffect,useState } from 'react';
import PageLayout from './PageLayout';
import { Typography, List, Button } from 'antd';
import useTourLogic from '../../Hooks/useTourLogic';
import useProjectsStore from '../../store/projectsStore';
import ProjectsService from '../../API/ProjectsService';
import Project from '../Components/Project';
import ProjectForm from '../forms/ProjectForm';
import { useTranslation } from 'react-i18next';
const { Title } = Typography;

/**
 * Страница отображения проектов.
 * @component
 * @returns {JSX.Element} - Элемент компонента.
 */
const ProjectsPage = () => {


  // Шаги тура по странице проектов
  const tourSteps = [
    {
      selector: '.projects-title',
      content: 'Welcome to the Projects Page!',
    },
    {
      selector: '.projects-list',
      content: 'Here are your projects!',
    },
    {
      selector: '.project',
      content: 'Explore each project in detail here!',
    },
    {
      selector: '.add-project',
      content: 'Feel free to add a new project!',
    },
  ];

  const { TourComponent } = useTourLogic(tourSteps);
  const { projects, setProjects } = useProjectsStore();
  const [isModalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

    /**
   * Обработчик добавления новой задачи.
   */
    const handleAddProject = () => {
      setModalVisible(true);
    };
  
    /**
     * Обработчик отмены добавления новой задачи.
     */
    const handleCancel = () => {
      setModalVisible(false);
    };

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
  }, [setProjects]);
  return (
    <PageLayout>
      {/* Заголовок страницы */}
      <Title level={2} className="projects-title">
        {t('pages.projectsPage.Title')}
      </Title>

      {/* Список проектов */}
      <List
        className="projects-list"
        footer={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Button className="add-project" onClick={handleAddProject}>{t('pages.projectsPage.Add Project Button')}</Button>
            <ProjectForm mode="add" visible={isModalVisible} onCancel={handleCancel} />
            {/* Дополнительные элементы футера */}
          </div>
        }
        bordered
        dataSource={projects}
        renderItem={(item) => <Project project={item} />}
      />

      {/* Компонент тура */}
      <TourComponent />
    </PageLayout>
  );
};

export default ProjectsPage;
