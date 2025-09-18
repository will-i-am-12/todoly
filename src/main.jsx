import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Layout from './routes/Layout.jsx'
import Create from './pages/Create.jsx'
import Tasks from './pages/Tasks.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import NotFound from './routes/NotFound.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path='/tasks' element={<Tasks/>} />
              <Route path='/create' element={<Create />} />
            </Route>
            <Route path='/*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
)
