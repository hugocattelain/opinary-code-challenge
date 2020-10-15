import React, { useEffect, useState } from 'react';
import Poll from 'react-polls';

const url = 'http://localhost:5000/poll';

/* function surveyReducer(state, action) {
  switch (action.type) {
    case 'VOTE_QUESTION':
      const newPollAnswers = state.answers.map(answer => {
        if (answer.option === voteAnswer) {
          answer.votes++;
        }
        return answer;
      });
      const newPollQuestion = {
        ...pollQuestion,
        answers: newPollAnswers,
        hasVoted: true,
        vote: voteAnswer,
      };
      return { ...state };
  }
} */

const Survey = () => {
  const [pollQuestion, setPollQuestion] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPollQuestion(data);
      });
  }, []);

  const handleVote = voteAnswer => {
    const newPollAnswers = pollQuestion.answers.map(answer => {
      if (answer.option === voteAnswer) {
        answer.votes++;
      }
      return answer;
    });
    const newPollQuestion = {
      ...pollQuestion,
      answers: newPollAnswers,
      hasVoted: true,
      vote: voteAnswer,
    };

    if (pollQuestion.hasVoted === false) {
      const options = {
        method: 'POST',
        body: JSON.stringify(newPollQuestion),
        headers: { 'Content-Type': 'application/json' },
      };
      fetch(url, options)
        .then(res => res.json())
        .then(res => setPollQuestion(newPollQuestion));
    }
  };

  return (
    <div>
      {pollQuestion && (
        <Poll
          question={pollQuestion.text}
          answers={pollQuestion.answers}
          onVote={handleVote}
          vote={pollQuestion.vote}
          noStorage
        />
      )}
    </div>
  );
};

export default Survey;
