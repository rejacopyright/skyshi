import Header from './header'
import { Outlet } from 'react-router-dom'
const Index = () => {
  return (
    <>
      <Header />
      <div className='container py-3'>
        <Outlet />
      </div>
    </>
  )
}

export default Index
