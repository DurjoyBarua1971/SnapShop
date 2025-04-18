import { Outlet } from 'react-router-dom'
import './App.css'

function App() {


  return (
    <div className='bg-amber-200 min-h-screen flex flex-col items-center justify-center'>
      <h1 className='font-poppins'>I am Poppins Font</h1>
      <h2 className='font-inter'>I am Inter Font</h2>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
