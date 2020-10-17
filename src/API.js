var baseUrl = 'https://opinary-code-challenge.herokuapp.com/api';
if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000;
  baseUrl = 'http://localhost:' + PORT + '/api';
}

async function getPolls() {
  return await fetch(`${baseUrl}/polls`).then(response => response.json());
}

async function getPoll(id) {
  let result;
  try {
    result = await fetch(`${baseUrl}/poll/${id}`).then(response =>
      response.json()
    );
  } catch (err) {
    return console.log('error:', err);
  }

  return result;
}

async function setPoll(poll) {
  let result;
  try {
    result = await fetch(`${baseUrl}/poll/${poll.id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(poll),
    }).then(response => response.json());
  } catch (err) {
    return console.log('error:', err);
  }

  return result;
}

const API = {
  getPoll: getPoll,
  getPolls: getPolls,
  setPoll: setPoll,
};

export default API;
