import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ReadingPage from './pages/ReadingPage';
import TranslationPage from './pages/TranslationPage';
import TranslationGradePage from './pages/TranslationGradePage';


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
  {
    path:"/translation",
    element: <TranslationPage/>
  },
  {
    path:"/translationgrade",
    element: <TranslationGradePage/>
  }
])
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
