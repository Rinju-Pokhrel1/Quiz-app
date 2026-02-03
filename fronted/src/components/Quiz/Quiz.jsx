// import React, { useState, useRef ,useEffect } from 'react';
// import './Quiz.css';

// const Quiz = () => {
//   let [quizzes, setQuizzes] = useState([]); // add this
//   let [index, setIndex] = useState(0);
//   let [question, setQuestion] = useState(null);
//   let [lock, setLock] = useState(false);
//   let [score, setscore] = useState(0);
//   let [result, setResult] = useState(false);

//   let option1 = useRef(null);
//   let option2 = useRef(null);
//   let option3 = useRef(null);
//   let option4 = useRef(null);
//   let option_array = [option1, option2, option3, option4];

//   // Fetch quizzes from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/quizzes")
//       .then(res => res.json())
//       .then(data => {
//         setQuizzes(data);
//         setQuestion(data[0]); // set first question
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const checkAns = (e, ans) => {
//     if (!lock) {
//       if (question.ans === ans) {
//         e.target.classList.add("Correct");
//         setscore(prev => prev + 1);
//       } else {
//         e.target.classList.add("Wrong");
//         option_array[question.ans - 1].current.classList.add("Correct");
//       }
//       setLock(true);
//     }
//   };

//   const next = () => {
//     if (!lock) return;
//     if (index === quizzes.length - 1) {
//       setResult(true);
//     } else {
//       const nextIndex = index + 1;
//       setIndex(nextIndex);
//       setQuestion(quizzes[nextIndex]);
//       setLock(false);

//       // remove classes
//       option_array.forEach(option => {
//         option.current.classList.remove("Wrong");
//         option.current.classList.remove("Correct");
//       });
//     }
//   };

//   const reset = () => {
//     setIndex(0);
//     setQuestion(quizzes[0]);
//     setscore(0);
//     setLock(false);
//     setResult(false);

//     option_array.forEach(option => {
//       option.current.classList.remove("Wrong");
//       option.current.classList.remove("Correct");
//     });
//   };

//   if (!question) return <p>Loading...</p>; // wait for fetch

//   return (
//     <div className='container'>
//       <h1>Quiz-app</h1>
//       <hr />
//       {!result ? (
//         <>
//           <h2>{index + 1}. {question.question}</h2>
//           <ul>
//             <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
//             <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
//             <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
//             <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
//           </ul>
//           <button onClick={next}>Next</button>
//           <div className="index">{index + 1} of {quizzes.length} questions</div>
//         </>
//       ) : (
//         <>
//           <h2>You scored {score} out of {quizzes.length}</h2>
//           <button onClick={reset}>Reset</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Quiz;
import React, { useState, useEffect, useRef } from "react";
import "./Quiz.css";

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [error, setError] = useState("");

  // Option refs
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const option_array = [option1, option2, option3, option4];

  // Fetch quizzes from backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must login first to take the quiz.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/quizzes", {
          headers: { "Authorization": "Bearer " + token },
        });

        if (!res.ok) {
          if (res.status === 401) throw new Error("Unauthorized. Please login again.");
          throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        if (data.length === 0) {
          setError("No quizzes available.");
          return;
        }

        setQuizzes(data);
        setQuestion(data[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQuizzes();
  }, []);


  const checkAns = (e, ans) => {
    if (!lock && question) {
      if (question.ans === ans) {
        e.target.classList.add("Correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("Wrong");
        option_array[question.ans - 1]?.current.classList.add("Correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (!lock) return;
    if (index === quizzes.length - 1) {
      setResult(true);
    } else {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setQuestion(quizzes[nextIndex]);
      setLock(false);

      option_array.forEach((option) => {
        option.current?.classList.remove("Wrong");
        option.current?.classList.remove("Correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(quizzes[0]);
    setScore(0);
    setLock(false);
    setResult(false);

    option_array.forEach((option) => {
      option.current?.classList.remove("Wrong");
      option.current?.classList.remove("Correct");
    });
  };

  if (error) return <div className="container"><p className="error">{error}</p></div>;
  if (!question) return <div className="container"><p className="loading">Loading quiz...</p></div>;

  const progress = ((index + 1) / quizzes.length) * 100;

  return (
    <div className="container">
      <h1>🧠 QuizMaster</h1>
      <hr />
      {!result ? (
        <>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="score-display">
            Score: {score} / {index + 1}
          </div>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next} disabled={!lock}>
            {index === quizzes.length - 1 ? "Finish" : "Next"}
          </button>
          <div className="index">
            Question {index + 1} of {quizzes.length}
          </div>
        </>
      ) : (
        <div className="result-screen">
          <h2>
            Quiz Complete! 🎉
          </h2>
          <p>You scored <strong>{score}</strong> out of <strong>{quizzes.length}</strong></p>
          <p>Accuracy: {Math.round((score / quizzes.length) * 100)}%</p>
          <button onClick={reset}>Take Quiz Again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
