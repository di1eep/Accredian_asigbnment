import { useState } from 'react'
import { Modal, Box, TextField, Button, Typography } from '@mui/material'
import ReferEarn from "./components/form.jsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <ReferEarn />
      </>
  )
}

export default App
