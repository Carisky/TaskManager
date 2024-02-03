import React, { useEffect, useRef } from "react";
import { Form, Input, DatePicker, Select, Button, Modal, notification } from "antd";
import TasksService from "../../API/TasksService";
import useTasksStore from "../../store/tasksStore";
import { useTranslation } from "react-i18next";
const { Option } = Select;

/**
 * Модальное окно для добавления и редактирования задачи.
 * @component
 * @param {string} modeRef.current - Режим модального окна: "add", "edit", "addToProject".
 * @param {boolean} visible - Флаг видимости модального окна.
 * @param {function} onCancel - Обработчик закрытия модального окна.
 * @param {Object} initialData - Начальные данные для редактирования задачи.
 * @param {number} projectId - Идентификатор проекта, к которому будет добавлена задача.
 * @returns {JSX.Element} - Элемент компонента.
 */
const TaskForm = ({ mode, visible, onCancel, initialData, projectId }) => {
  const [form] = Form.useForm();
  const { tasks, setTasks } = useTasksStore();
  const { t } = useTranslation();
  const modeRef = useRef(mode);

  useEffect(() => {
    if (initialData) {
      modeRef.current = "edit";
      form.setFieldsValue({
        title: initialData.title,
        priority: initialData.priority,
        description: initialData.description ? initialData.description : "",
        tags: initialData.tags ? initialData.tags : "",
      });
    }
  }, [initialData, form]);

  /**
   * Обработчик завершения формы.
   * @async
   * @function
   * @param {Object} values - Значения полей формы.
   */
  const handleFinish = async (values) => {
    try {
      let result;
      const formattedValues = {
        ...values,
        due_date: values.due_date.format("YYYY-MM-DD HH:mm:ss"),
      };
      if (modeRef.current === "add") {
        result = await TasksService.addTask(formattedValues);
      } else if (modeRef.current === "edit") {
        result = await TasksService.editTask(initialData.id, formattedValues);
      } else if (modeRef.current === "addToProject") {
        const newFieldsFormattedValues = {
          ...formattedValues,
          project_id: projectId,
        };
        result = await TasksService.addTask(newFieldsFormattedValues);
      }

      const { success, message, data } = result;

      if (success) {
        if (modeRef.current === "add" || modeRef.current === "addToProject") {
          setTasks([...tasks, data]);
        } else if (modeRef.current === "edit") {
          const updatedTasks = tasks.map((obj) => (obj.id === data.id ? data : obj));
          setTasks(updatedTasks);
        }

        notification.success({
          message: `${modeRef.current === "add" ? "Task Added" : modeRef.current === "addToProject" ? "Task Added to Project" : "Task Updated"}`,
          description: `The task has been ${
            modeRef.current === "add" || modeRef.current === "addToProject" ? "added" : "updated"
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

  /**
   * Отображение заголовка формы в зависимости от режима.
   * @function
   * @returns {string} - Заголовок формы.
   */
  const renderFormTitle = () => {
    if (modeRef.current === "add") {
      return "Add Task";
    } else if (modeRef.current === "edit") {
      return "Edit Task";
    } else if (modeRef.current === "addToProject") {
      return "Add Task to Project";
    }
  };

  /**
   * Отображение текста на кнопке отправки формы в зависимости от режима.
   * @function
   * @returns {string} - Текст кнопки отправки формы.
   */
  const renderSubmitButtonLabel = () => {
    if (modeRef.current === "add") {
      return "Add Task";
    } else if (modeRef.current === "edit") {
      return "Update Task";
    } else if (modeRef.current === "addToProject") {
      return "Add Task to Project";
    }
  };

  return (
    <Modal
      title={t(`forms.taskForm.${renderFormTitle()}`)}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="title" label={t("forms.taskForm.Title")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="due_date" label={t("forms.taskForm.Due Date")} rules={[{ required: true }]}>
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="priority" label={t("forms.taskForm.Priority")} rules={[{ required: true }]}>
          <Select>
            <Option value={3}>{t("forms.taskForm.Options.High")}</Option>
            <Option value={2}>{t("forms.taskForm.Options.Medium")}</Option>
            <Option value={1}>{t("forms.taskForm.Options.Low")}</Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label={t("forms.taskForm.Description")}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="tags" label={t("forms.taskForm.Tags")}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t(`forms.taskForm.${renderSubmitButtonLabel()}`)}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
