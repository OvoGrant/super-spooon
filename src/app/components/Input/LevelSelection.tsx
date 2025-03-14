import { LEVELS } from "../../utils/Dictionaries";

interface LevelSelectionProps {
  selectedLevel: string,
  handleChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LevelSelection: React.FC<LevelSelectionProps> = ({selectedLevel, handleChange }) => {
  return (
    <div className="flex-col w-5/6 items-center text-center">
    <h2 className="text-3xl my-4">Level</h2>
    <div className="flex justify-center items-center gap-12">   
      {LEVELS.map((level) => (
        <button 
            className={`hover:cursor-pointer w-20 h-20 rounded-full  ${selectedLevel == level ? "bg-cyan-500 text-white" : "bg-gray-100" }`} 
            key={level} onClick={handleChange}>
          {level}
        </button>
      ))}
    </div>
    </div>
  );
};

export default LevelSelection;
