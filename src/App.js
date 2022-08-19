import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <>
      <Suspense> {useRoutes(routes)} </Suspense>
      <ToastContainer />
    </>
  )
}

export default App
