import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Chat from './pages/chat/chat'
import Login from './pages/login/login'
import NotFound from './pages/notFound/notFound'

function MappedRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/chat' element={ <Chat/> }/>
        <Route path='/404' element={ <NotFound/> }/>
        <Route path='*' element={ <Navigate to={'/404'} /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default MappedRoutes
