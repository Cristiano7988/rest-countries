import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';

ReactDOM.render(
  <ThemeProvider theme={theme} children={<App />} />,
  document.getElementById('root')
);
