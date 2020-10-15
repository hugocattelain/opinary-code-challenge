import React, { useEffect, useState } from 'react';
import Poll from 'react-polls';
import defaultPolls from '../../data2.json';

const Survey = ({ match }) => {
  const [poll, setPoll] = useState(null);
  const pollIndex = match.params.pollIndex;

  useEffect(() => {
    setPoll(defaultPolls[pollIndex]); // Todo: import from localstorage
  }, [pollIndex]);

  const handleVote = voteAnswer => {
    const newPollAnswers = poll.answers.map(answer => {
      if (answer.option === voteAnswer) {
        answer.votes++;
      }
      return answer;
    });
    const newPollQuestion = {
      ...poll,
      answers: newPollAnswers,
      hasVoted: true,
      vote: voteAnswer,
    };

    if (poll.hasVoted === false) {
      setPoll(newPollQuestion); // Todo: save in localestorage
    }
  };

  return (
    <div>
      {poll && (
        <Poll
          question={poll.text}
          answers={poll.answers}
          onVote={handleVote}
          vote={poll.vote}
          noStorage
        />
      )}
    </div>
  );
};

export default Survey;
