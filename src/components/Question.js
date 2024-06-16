import React, { useState } from "react";

const Question = ({ data, onAnswer, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { question, correct_answer, incorrect_answers } = data;
  const [showAlert, setShowAlert] = useState(false);
  const options = [...incorrect_answers, correct_answer];

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 900);
      return;
    }
    const isCorrect = selectedAnswer === correct_answer;
    setShowExplanation(true);
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    setShowExplanation(false);

    setSelectedAnswer(null);
    onNext();
  };

  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };
  return (
    <>
      <main className="overflow-hidden">
        {/* <!-- Steps Start --> */}

        <section className="steps">
          <form
            noValidate=""
            onsubmit="return false"
            id="stepForm"
            className="show-section"
            style={{ position: "relative", top: "6rem" }}
          >
            {/* <!-- Step --> */}
            <fieldset id="step2">
              {/* <!-- Options -->*/}
              {showAlert && (
                <div
                  className="reveal alert alert-danger"
                  style={{ position: "absolute", left: "2rem", top: "4rem" }}
                >
                  Choose an option!
                </div>
              )}
              <div className="d-flex flex-wrap options">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`option animate ${
                      selectedAnswer === option ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={handleOptionChange}
                    />
                    <label
                      htmlFor={`option-${index}`}
                      dangerouslySetInnerHTML={{ __html: option }}
                    />
                  </div>
                ))}
              </div>

              {/* <!-- Question --> */}
              <div className="question">
                <h2 dangerouslySetInnerHTML={{ __html: question }} />

                {/* <!-- Next Prev --> */}
                <div className="nextPrev">
                  <button
                    className="next"
                    type="button"
                    id="step2btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  {showExplanation && (
                    <button className="prev" type="button" onClick={handleNext}>
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  )}

                  {/* answer is correct or incorrect */}
                  {showExplanation && (
                    <div className="explanation">
                      {selectedAnswer === correct_answer ? (
                        <p>Correct!</p>
                      ) : (
                        <div>
                          <p>
                            Incorrect! The correct answer is:{" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: correct_answer
                              }}
                            />
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="fill" style={{ width: "25%" }}></div>
              </div>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  );
};

export default Question;
