import React from 'react';
import Router from './router';
import { withRouter } from 'react-router-dom';
import './App.css';

function App() {
  return <Router />;
}

export default withRouter(App);
