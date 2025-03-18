import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ReadingPage from './pages/ReadingPage';
import TranslationPage from './pages/TranslationPage';
import TranslationGradePage from './pages/TranslationGradePage';
import ListeningPage from './pages/ListeningPage';
import ListeningGradePage from './pages/ListeningGragePage';
import RealChatPage from './pages/RealChatPage';
import { v4 as uuidv4 } from 'uuid';


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
  },
  {
    path: "/listening",
    element: <ListeningPage/>
  },
  {
    path:"/listeninggrade",
    element: <ListeningGradePage/>
  },
  {
    path:"/realchat",
    element: <RealChatPage uuid={uuidv4()} language='french'/>
  }
])
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
