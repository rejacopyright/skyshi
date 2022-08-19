import Navbar from 'react-bootstrap/Navbar'
const Index = () => {
  return (
    <Navbar bg='primary' expand='lg' sticky='top' data-cy='header-background'>
      <div className='container py-3'>
        <h5 className='text-white m-0 fw-bold' data-cy='header-title'>
          TO DO LIST APP
        </h5>
      </div>
    </Navbar>
  )
}

export default Index
