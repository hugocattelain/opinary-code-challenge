import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Poll from 'react-polls';
import API from '../../API';

const Survey = ({ match }) => {
  const [poll, setPoll] = useState(null);
  const pollId = match.params.pollId;

  useEffect(() => {
    API.getPoll(pollId).then(data => {
      setPoll(data);
    });
  }, [pollId]);

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
      vote: voteAnswer,
    };
    if (poll.vote !== '') {
      API.setPoll(newPollQuestion).then(res => setPoll(newPollQuestion));
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

export default withRouter(Survey);
