import React, { useEffect, useState } from 'react';
import defaultPolls from '../../data2.json';

const ManagePolls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    setPolls(defaultPolls);
  }, []);

  const setInput = e => {
    console.log(e.target.value, e.target.name);
  };

  const deleteOption = (pollAnswers, pollIndex, answerIndex) => e => {
    let newPollAnswers = [...pollAnswers];
    newPollAnswers.splice(answerIndex, 1);
    updatePoll(pollIndex, newPollAnswers);
  };

  const addOption = (pollAnswers, pollIndex) => e => {
    const newPollAnswers = [...pollAnswers, { option: 'New Answer', votes: 0 }];
    updatePoll(pollIndex, newPollAnswers);
  };

  const answerChange = (pollAnswers, pollIndex, answerIndex) => e => {
    const newPollAnswer = { option: e.target.value, votes: 0 };
    let newPollAnswers = [...pollAnswers];
    newPollAnswers[answerIndex] = newPollAnswer;
    updatePoll(pollIndex, newPollAnswers);
  };

  const updatePoll = (pollIndex, newPollAnswers) => {
    const newPoll = {
      ...polls[pollIndex],
      hasVoted: false,
      vote: '',
      answers: newPollAnswers,
    };

    let newPolls = [...polls];
    newPolls[pollIndex] = newPoll;
    setPolls(newPolls);
  };

  return (
    <div>
      {polls.length > 0 && (
        <div>
          {polls.map((poll, i) => (
            <div key={i}>
              <div>Poll question: </div>
              <input
                name='text'
                type='text'
                value={poll.text}
                onChange={setInput}
              />
              <div>Poll answers: </div>
              {poll.answers.map((answer, j) => (
                <div key={j}>
                  <input
                    type='text'
                    value={answer.option}
                    onChange={answerChange(poll.answers, i, j)}
                    required
                  />
                  <button onClick={deleteOption(poll.answers, i, j)}>
                    <i className='material-icons'>delete</i>
                  </button>
                </div>
              ))}
              <button onClick={addOption(poll.answers, i)}>
                <i className='material-icons'>add</i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePolls;
