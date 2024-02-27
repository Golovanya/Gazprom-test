import React, { useEffect, useState } from 'react';
import { AppCard } from './Components/AppCard';
import './App.css';
import axios from 'axios';
import { Loader } from '@consta/uikit/Loader';

async function fetchData() {
  try {
    const { data } = await axios.get(
      'https://65dcb66ae7edadead7ecbf15.mockapi.io/valute'
    );
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }
}

function App() {
  const [data, setData] = useState(null);

  const fetchDataAsync = async () => {
    const fetchedData = await fetchData();
    setData(fetchedData);
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  if (!data) return <Loader />

  return data && Object.values(data).length ? <AppCard data={data} /> : <p>Данных нет</p>
}

export default App;
