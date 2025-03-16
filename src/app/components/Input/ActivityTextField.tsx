type ActivityTextFieldProps = {
    prompt: string
    onChange: React.Dispatch<React.SetStateAction<string>>
}

const ActivityTextField: React.FC<ActivityTextFieldProps> = ({prompt, onChange}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="w-7/8 border-0 rounded-xl p-4 h-1/8 bg-zinc-100">
            <h3>{prompt}</h3>
            <input
                onChange={handleChange}
                type="text"
                className="border-0 border-b-1 border-black focus:ring-0 outline-none w-full"
            />
        </div>
    );
}

export default ActivityTextField;