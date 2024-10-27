'use client'

import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

export default function Home() 
{

  const [ theme, setTheme ] = useState('');

  useEffect(()=>
  {
    setTheme(localStorage.getItem('theme') ?? 'light')
  },[])

  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme}/>
      <Dashboard theme={theme}/>
    </div>
  );
}
