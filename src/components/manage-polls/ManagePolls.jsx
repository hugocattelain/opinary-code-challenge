import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import API from '../../API.js';
import './manage-polls.scss';

const ManagePolls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    API.getPolls().then(data => {
      setPolls(data);
    });
  }, []);

  const setQuestion = pollId => e => {
    let newPoll = polls.find(poll => poll.id === pollId);
    newPoll.text = e.target.value;
    const newPolls = polls.map(poll => {
      return poll.id === pollId ? newPoll : poll;
    });
    setPolls(newPolls);
  };

  const deleteOption = (poll, answerIndex) => e => {
    let newPollAnswers = poll.answers;
    newPollAnswers.splice(answerIndex, 1);
    API.setPoll(poll).then(res => updatePoll(poll, newPollAnswers));
  };

  const addOption = poll => e => {
    let newPollAnswers = poll.answers;
    newPollAnswers.push({ option: '', votes: 0 });
    updatePoll(poll, newPollAnswers);
  };

  const answerChange = (poll, answerIndex) => e => {
    const newPollAnswer = { option: e.target.value, votes: 0 };
    let newPollAnswers = poll.answers;
    newPollAnswers[answerIndex] = newPollAnswer;
    updatePoll(poll, newPollAnswers);
  };

  // When poll question or answers change, the user vote is removed
  const updatePoll = (poll, newPollAnswers) => {
    const newPoll = {
      ...poll,
      vote: '',
      answers: newPollAnswers.map(el => {
        return { ...el, votes: 0 };
      }),
    };

    console.log(newPollAnswers);
    let newPolls = polls.map(item => {
      return item.id === poll.id ? newPoll : item;
    });
    setPolls(newPolls);
  };

  const submitChanges = poll => e => {
    API.setPoll(poll).then(res => console.log('saved'));
  };

  return (
    <div className='manage-polls__container'>
      <h1>Manage Polls</h1>
      {polls.length > 0 && (
        <div className='manage-polls__list'>
          {polls.map((poll, i) => (
            <div className='manage-polls__item' key={i}>
              <div className='manage-polls__title'>Question</div>
              <input
                className='manage-polls__input'
                type='text'
                value={poll.text}
                onChange={setQuestion(poll.id)}
                onBlur={submitChanges(poll)}
              />
              <div className='manage-polls__subtitle'>Answers</div>
              {poll.answers.map((answer, j) => (
                <div className='manage-polls__answer' key={j}>
                  <input
                    type='text'
                    value={answer.option}
                    onChange={answerChange(poll, j)}
                    onBlur={submitChanges(poll)}
                    required
                  />
                  <button onClick={deleteOption(poll, j)}>
                    <i className='material-icons'>delete</i>
                  </button>
                </div>
              ))}
              <button onClick={addOption(poll)}>
                <i className='material-icons'>add</i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withRouter(ManagePolls);
