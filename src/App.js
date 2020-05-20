import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  return { value, onChange };
}

function useFetch(url) {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const callUrl = async () => {
    try {
      const { data } = await axios.get(url);
      setPayload(data);
    } catch {
      setError('b');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callUrl();
  }, []);

  return { payload, loading, error };
}

function App() {
  const name = useInput('');
  const { payload, loading, error } = useFetch('https://aws.random.cat/meow');
  console.log(name);
  return (
    <div className='App'>
      <h1>USE HOOKS!!</h1>
      <br />
      <input {...name} placeholder="What's your name?" />
      <br />
      {loading && <span>loading your cat</span>}
      {!loading && error && <span>{error}</span>}
      {!loading && payload && <img src={payload.file} width='150px' />}
    </div>
  );
}
// ...name 은 이것과 동일 함. value={name.value} onChange={name.onChange}
export default App;
