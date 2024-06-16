import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./components/Question";
import Results from "./components/Results";
import loading from "./img/loading.gif";
import page_loading from "./img/loading-gif.gif";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  useEffect(() => {
    fetchQuestions();
  }, []);

  //fetch question and ans data
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      setQuestions(response.data.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  // Show loading indicator for 2 seconds before displaying results
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setLoadingResults(true);
      setTimeout(() => {
        setLoadingResults(false);
        setShowResults(true);
      }, 2000);
    }
  };

  //reset the quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    fetchQuestions();
  };

  //display loading gif before diplay question conponent
  if (questions.length === 0) {
    return (
      <div
        className="loadingresult"
        style={{ display: "grid", marginTop: "20rem" }}
      >
        <img src={page_loading} alt="loading" style={{ width: "20%" }} />
      </div>
    );
  }

  // display loading gif before display Result
  if (loadingResults) {
    return (
      <div
        className="loadingresult"
        style={{ display: "grid", marginTop: "20rem" }}
      >
        <img src={loading} alt="loading" />
      </div>
    );
  }

  //display result component
  if (showResults) {
    return (
      <Results
        score={score}
        totalQuestions={questions.length}
        onReset={resetQuiz}
      />
    );
  }

  return (
    <div className="App">
      <Question
        data={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
};

export default App;
