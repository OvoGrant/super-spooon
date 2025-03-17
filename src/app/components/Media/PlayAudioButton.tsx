import { useRef } from "react";

type PlayAudioButtonProps = {
    audioSrc: string;
};

const PlayAudioButton: React.FC<PlayAudioButtonProps> = ({ audioSrc }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    return (
        <>
            <button className="bg-cyan-500 rounded-full text-white h-6/8 w-2/8" onClick={handlePlay}>Play Audio</button>
            <audio ref={audioRef} src={audioSrc} />
        </>
    );
};

export default PlayAudioButton;
