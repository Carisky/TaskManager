import React, { useState, useCallback, useEffect } from "react";
import Tour from "reactour";
import { InfoCircleOutlined } from "@ant-design/icons";

/**
 * Хук для управления всплывающими подсказками (турами) в приложении.
 * @param {Object[]} steps - Массив объектов, описывающих шаги тура.
 * @returns {Object} - Объект с компонентом тура и методами управления туром.
 */
const useTourLogic = (steps) => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  /**
   * Закрытие тура и сброс текущего шага.
   * @function
   */
  const closeTour = useCallback(() => {
    setIsTourOpen(false);
    setCurrentStep(0);
  }, []);

  /**
   * Запуск тура с указанным начальным шагом.
   * @function
   * @param {number} step - Начальный шаг тура.
   */
  const startTour = useCallback((step) => {
    setIsTourOpen(true);
    setCurrentStep(step);
  }, []);

  /**
   * Переход к указанному шагу тура.
   * @function
   * @param {number} step - Шаг, к которому нужно перейти.
   */
  const goToStep = useCallback((step) => {
    setCurrentStep(step);
  }, []);

  /**
   * Обработка события нажатия клавиши F1 для запуска тура.
   * @function
   * @param {Event} event - Событие клавиши.
   */
  const handleF1KeyPress = useCallback(
    (event) => {
      if (event.key === "F1") {
        event.preventDefault();
        startTour(0);
      }
    },
    [startTour]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleF1KeyPress);
    return () => {
      window.removeEventListener("keydown", handleF1KeyPress);
    };
  }, [handleF1KeyPress]);

  /**
   * Компонент тура, включая кнопку для запуска тура.
   * @component
   * @returns {JSX.Element} - Элемент компонента тура.
   */
  const TourComponent = () => (
    <div
      onClick={() => startTour(0)}
      style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:"12px 34px 51px 8px",
        width: "30px",
        height: "30px",
        backgroundColor: "#fff",
        position: "absolute",
        right: 20,
        top: 20,
        cursor:"pointer"
      }}
    >
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={closeTour}
        getCurrentStep={() => currentStep}
        goToStep={goToStep}
      />
      <InfoCircleOutlined/>
    </div>
  );

  return { TourComponent, startTour, goToStep };
};

export default useTourLogic;
