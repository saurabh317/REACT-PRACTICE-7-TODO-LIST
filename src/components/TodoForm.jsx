import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const [time, setTime] = useState(props.edit ? props.edit.value : '' );
  const [disabled , setDisabled] = useState(false);
  const inputRef = useRef(null);
  const timeRef = useRef(null);

  
  const handleChange = e => {
    setInput(e.target.value);
  };
  const handleChangeTime = e => {
    setTime(e.target.value);
  };

  useEffect(() => {
    if(input !== "" && time !== ""){
      setDisabled(false);
    }else{
      setDisabled(true);
    }
  },[input,time])

  useEffect(() => {
    inputRef.current.focus();
  },[]);

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      time: time,
    });
    setInput('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <input
            placeholder='Add a date'
            value={time}
            type='date'
            onChange={handleChangeTime}
            name='time'
            className='todo-input edit'
            ref={timeRef}
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <input
            placeholder='Add a date'
            value={time}
            type='date'
            onChange={handleChangeTime}
            name='time'
            className='todo-input'
            ref={timeRef}
          />
         <button disabled={disabled} onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
