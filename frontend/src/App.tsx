import React from 'react';
import './App.css';

function App() {
  const getPrice = async () => {
    const response = await fetch('http://localhost:3005', {
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
      +console.log(content);

      <div dangerouslySetInnerHTML={{__html: content}}></div>;
    }
  };
  getPrice();

  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          LARIANLARIANLARIAN2
        </a>
      </header>
    </div>
  );
}

export default App;
