import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const Calc: React.FC = () => {
  useEffect(() => {
    const getPrice = async () => {
      const response = await fetch('http://localhost:3005', {
        body: JSON.stringify({
          jwtToken: localStorage.getItem('jwtToken'),
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (response.status !== 400) {
        const content = await response.json();
        // +console.log(content);
        // const priceUsd = content.price[0].priceUsd;
        +console.log('calling setPrice()');

        <div dangerouslySetInnerHTML={{__html: content}}></div>;
      }
    };
    getPrice();

    console.log('I got cleaned-up');
  }, []);

  return <div>Calc</div>;
};

export {Calc};
