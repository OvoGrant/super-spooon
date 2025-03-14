import React, { ChangeEvent } from 'react';

interface LanguageSelectionProps {
  language: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ language, handleChange }) => {
  return (
    <div className="flex flex-col text-3xl text-center">
      <label htmlFor="language">Language </label>
      <select
        className="text-center"
        id="language"
        value={language}
        onChange={handleChange}
      >
        <option value="">Select a language</option>
        <option value="french">French</option>
        <option value="spanish">Spanish</option>
      </select>
    </div>
  );
};

export default LanguageSelection;