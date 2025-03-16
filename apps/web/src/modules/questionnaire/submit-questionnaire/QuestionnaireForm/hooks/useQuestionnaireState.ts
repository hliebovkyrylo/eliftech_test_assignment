import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useQuestionnaireState = (questionnaireId: string) => {
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    () => {
      const savedAnswers = Cookies.get(`answers_${questionnaireId}`);
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    }
  );

  const [startTime, setStartTime] = useState<number>(() => {
    const savedTime = Cookies.get(`startTime_${questionnaireId}`);
    return savedTime ? parseInt(savedTime) : Date.now();
  });

  useEffect(() => {
    Cookies.set(`answers_${questionnaireId}`, JSON.stringify(answers), {
      expires: 7,
      sameSite: "strict",
    });
  }, [answers, questionnaireId]);

  useEffect(() => {
    const savedTime = Cookies.get(`startTime_${questionnaireId}`);
    if (!savedTime) {
      Cookies.set(`startTime_${questionnaireId}`, startTime.toString(), {
        expires: 7,
        sameSite: "strict",
      });
    }
  }, [startTime, questionnaireId]);

  const clearCookies = () => {
    Cookies.remove(`answers_${questionnaireId}`);
    Cookies.remove(`startTime_${questionnaireId}`);
  };

  const handleChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return { answers, startTime, handleChange, clearCookies };
};
