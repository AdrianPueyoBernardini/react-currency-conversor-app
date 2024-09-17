import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Header } from './Header'
import { Data } from './Data';
import { Background } from './Background';

import "./styles/style.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Background/>
    <Header title="Conversor.io" a1="Divisas"  a2="Contacto" contact={"https://adrianpueyobernardini.com/"}/>
    <Data exampleCash={1}/>
    

  </StrictMode>
)
