import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ReadingPage from './pages/ReadingPage';


function App() {

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/reading',
    element: <ReadingPage/>
  },
])
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
