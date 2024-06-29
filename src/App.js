import Time from './Components/Time';
import Trivia from './Components/Trivia';
import './app.css';
import { useState, useEffect,useMemo } from 'react';

function App() {
  const [questionset, setQuestionset] = useState(1); // Corrected variable name
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
 
  
  const listQuestions = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        { text: "Phone", correct: false },
        { text: "Watches", correct: true },
        { text: "Food", correct: false },
        { text: "Cosmetic", correct: false },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        { text: "2004", correct: true },
        { text: "2005", correct: false },
        { text: "2006", correct: false },
        { text: "2007", correct: false },
      ],
    },
    {
      id: 3,
      question: "Who played the character of Harry Potter in the movie series?",
      answers: [
        { text: "Johnny Depp", correct: false },
        { text: "Leonardo DiCaprio", correct: false },
        { text: "Denzel Washington", correct: false },
        { text: "Daniel Radcliffe", correct: true },
      ],
    },
  ];

  const data = useMemo(()=>[
    { id: 1, amount: "$ 100" },
    { id: 2, amount: "$ 200" },
    { id: 3, amount: "$ 300" },
    { id: 4, amount: "$ 500" },
    { id: 5, amount: "$ 1000" },
    { id: 6, amount: "$ 2000" },
    { id: 7, amount: "$ 4000" },
    { id: 8, amount: "$ 8000" },
    { id: 9, amount: "$ 16000" },
    { id: 10, amount: "$ 32000" },
    { id: 11, amount: "$ 64000" },
    { id: 12, amount: "$ 125000" },
    { id: 13, amount: "$ 250000" },
    { id: 14, amount: "$ 500000" },
    { id: 15, amount: "$ 1000000" },
  ].reverse(),[]);

  useEffect(() => {
    if (questionset > 0) {
      const foundItem = data.find((item) => item.id === questionset - 1);
      setEarned(foundItem?.amount || "$ 0");
    }
  }, [questionset, data]);

  return (
    <div className="App">
      <div className='left'>
        {stop ? (
          <h2 className='textAmount'>You have earned: {earned}</h2>
        ) : (
          <>
            <div className='top'>
            <Time  setStop={setStop} questionset={questionset}/>
            </div>
            <div className='bottom'>
              <Trivia listQuestions={listQuestions} setStop={setStop} questionset={questionset} setQuestionset={setQuestionset} />
            </div>
          </>
        )}
      </div>

      <div className='right'>
        <ul className='moneylist'>
          {data.map((item) => (
            <li key={item.id} className={questionset === item.id ? 'moneylistItem active' : 'moneylistItem'}>
              <span className='moneylistItemNumber'>{item.id}</span>
              <span className='moneylistItemAmount'>{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
