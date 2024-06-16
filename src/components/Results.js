import React from "react";
import loading from "../img/loading.gif";
import bh_clip from "../img/bh-clip.png";

function Results({ score, totalQuestions, onReset }) {
  const correctPercentage = ((score / totalQuestions) * 100).toFixed(2);
  const incorrectPercentage = ((1 - score / totalQuestions) * 100).toFixed(2);

  return (
    <>
      <div className="loadingresult" style={{ display: "grid" }}>
        <img src={loading} alt="loading" />
      </div>
      <div className="result_page result_page_show">
        <div className="result_inner">
          <div className="result_inner2">
            <h2>Knowledge Check</h2>
            <div className="u_result">
              <div className="u_score">Total Questions Served:</div>
              <div className="u_prcnt">
                {((totalQuestions / totalQuestions) * 100).toFixed(2)}%
              </div>
              <span>{totalQuestions}</span>
            </div>
            <div className="p_result">
              <div className="p_score">Total Correct Questions:</div>
              <div className="p_prcnt">{correctPercentage}%</div>
              <span>{score}</span>
            </div>
            <div className="p_result">
              <div className="p_score">Total Incorrect Questions:</div>
              <div className="p_prcnt">{incorrectPercentage}%</div>
              <span>{totalQuestions - score}</span>
            </div>
            <div className="line"></div>
            <div class="result_show">
              <div class="pass_check" onClick={onReset}>
                Reset Quiz
              </div>
            </div>
          </div>

          {/* <!-- rectangle --> */}
          <img className="behind_bg" src={bh_clip} alt="rectangle" />
        </div>
      </div>
    </>
  );
}

export default Results;
