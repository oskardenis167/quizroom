import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { IQuizResponse } from './Interfaces/QuizResponse';

const API = 'https://opentdb.com/api.php?amount=10';

const Quiz = () => {
  // const fetchData = async () => {
  //   const resp = await axios.get(API);
  //   const data = resp.data.results;
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const [data, setData] = useState<null | IQuizResponse[]>(null);
  const [loading, setLoading] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(API);
        setData(data.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  console.log(data);

  return (
    <>
      {loading && <span>Loading</span>}
      {data && <p>{data[0].category}</p>}
      {data && <p>{data[0].correct_answer}</p>}
      {data && <p>{data[0].difficulty}</p>}
      {data && <p>{data[0].incorrect_answers}</p>}
      {data && <p>{data[0].question}</p>}
      {data && <p>{data[0].type}</p>}
      {data && <p>{data[0].correct_answer}</p>}
    </>
  );
};

export default Quiz;
