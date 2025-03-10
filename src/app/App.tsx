import './App.css';
import ReadingPage from './routes/readingPage';

function App() {
  return (
    <div className="font-sans bg-zinc-100 h-screen w-screen border-2 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Untitled Language Application</h1>
      <ReadingPage readingLevel='Intermediate' language='french' />
    </div>
  );
}

export default App;
