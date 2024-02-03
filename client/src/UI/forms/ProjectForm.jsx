import React, { useEffect } from "react";
import { Form, Input, Button, Modal, notification } from "antd";
import ProjectsService from "../../API/ProjectsService";// Импортируйте сервис для работы с проектами
import useProjectsStore from "../../store/projectsStore"; // Импортируйте store для проектов
import { useTranslation } from "react-i18next";
/**
 * Модальное окно для добавления и редактирования проекта.
 * @component
 * @param {string} mode - Режим модального окна: "add", "edit".
 * @param {boolean} visible - Флаг видимости модального окна.
 * @param {function} onCancel - Обработчик закрытия модального окна.
 * @param {Object} initialData - Начальные данные для редактирования проекта.
 * @returns {JSX.Element} - Элемент компонента.
 */
const ProjectForm = ({ mode, visible, onCancel, initialData }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { projects, setProjects } = useProjectsStore();

  useEffect(() => {
    if (initialData) {
      mode = "edit";
      form.setFieldsValue({
        title: initialData.title,
        description: initialData.description ? initialData.description : "",
      });
    }
  }, [initialData, form]);

  const handleFinish = async (values) => {
    try {
      let result;
      if (mode === "add") {
        result = await ProjectsService.addProject(values);
      } else if (mode === "edit") {
        result = await ProjectsService.editProject(initialData.id, values);
      }

      const { success, message, data } = result;

      if (success) {
        if (mode === "add") {
          setProjects([...projects, data]);
        } else if (mode === "edit") {
          const updatedProjects = projects.map((obj) => (obj.id === data.id ? data : obj));
          setProjects(updatedProjects);
        }

        notification.success({
          message: `${mode === "add" ? "Project Added" : "Project Updated"}`,
          description: `The project has been ${
            mode === "add" ? "added" : "updated"
          } successfully.`,
          duration: 3,
        });
        form.resetFields();
      } else {
        notification.error({
          message: "Error",
          description: message,
          duration: 3,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderFormTitle = () => {
    if (mode === "add") {
      return "Add Project";
    } else if (mode === "edit") {
      return "Edit Project";
    }
  };

  const renderSubmitButtonLabel = () => {
    if (mode === "add") {
      return "Add Project";
    } else if (mode === "edit") {
      return "Update Project";
    }
  };

  return (
    <Modal
      title={t(`forms.projectForm.${renderFormTitle()}`)}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      maskClosable={false}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="title" label={t("forms.projectForm.Title")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label={t("forms.projectForm.Description")}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t(`forms.projectForm.${renderSubmitButtonLabel()}`)}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectForm;
