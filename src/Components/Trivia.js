import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import playSound from '../assets/play.mp3';
import correctSound from '../assets/correct.mp3';
import wrongSound from '../assets/wrong.mp3';

const Trivia = ({ listQuestions, setStop, questionset, setQuestionset }) => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  const [play] = useSound(playSound);
  const [correct] = useSound(correctSound);
  const [wrong] = useSound(wrongSound);

  useEffect(() => {
    if (question) {
      play();
    }
  }, [question, play]);

  useEffect(() => {
    setQuestion(listQuestions[questionset - 1]);
    setAnswer(null);
  }, [listQuestions, questionset]);

  const delay = (duration, callback) => {
    setTimeout(callback, duration);
  };

  const handleClick = (info) => {
    setAnswer(info);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(info.correct ? 'answer correct' : 'answer wrong');
    });
    delay(5000, () => {
      if (info.correct) {
        correct();
        delay(3000,()=>{
          setQuestionset(prev => prev + 1);
          setAnswer(null);
        })
       
        
      } else {
        wrong();
        delay(1000,()=>{
          setStop(true);
        })
       
      }
    });
  };

  return (
    <div className='Trivia'>
      <div className='question h-14 bg-gradient-to-r from-purple-500 to-pink-500'>
        {question?.question}
      </div>
      <div className='Answers'>
        {question?.answers.map((info, index) => (
          <div key={index} className={answer === info ? className : "answer"} onClick={() => handleClick(info)}>
            {info.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
