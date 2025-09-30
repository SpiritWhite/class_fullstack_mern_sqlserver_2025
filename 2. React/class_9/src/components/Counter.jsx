import React from 'react';


export const Counter = (props) => {

  const { 
    setCount
   } = props;

  const addBtn = () => setCount(prevState => prevState + 1);

  const rmvBtn = () => setCount(prevState => {
    if (prevState === 0)
      return prevState;
    return prevState - 1;
  });

  const resetBtn = () => setCount(0);


  return (
    <section style={{ display: 'flex', gap: 4 }}>
      <button
        onClick={() => addBtn()}
      >
        +1
      </button>
      <button
        onClick={() => resetBtn()}
      >
        Reset counter
      </button>
      <button
        onClick={() => rmvBtn()}
      >
        -1
      </button>
    </section>
  );
};