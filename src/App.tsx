import React, { useEffect, useState } from 'react';
import { AppCard } from './Components/AppCard';
import './App.css';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import axios from 'axios';
import { Loader } from '@consta/uikit/Loader';
import { MainDATA } from './types/types'

function App() {
  const[data, setData] = useState<MainDATA[]>([])
  useEffect(()=>{
    fetchData()
  },[])

  async function fetchData (){
      try{
          const response  = await axios.get('https://65dcb66ae7edadead7ecbf15.mockapi.io/valute')
          setData(response.data)
      } catch{
        alert('ошибка при загрузке данных')
      }
  }

  return (
    <Theme preset={presetGpnDefault}>
      {!data?<Loader/>:<AppCard data={data}/>}
      
    </Theme>
  );
}

export default App;
