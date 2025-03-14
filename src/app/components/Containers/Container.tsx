import { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
};

const Container : React.FC<ContainerProps> = ({children}) => {
    return (
        <div className="font-sans bg-zinc-100 h-screen w-screen border-2 flex flex-col justify-center items-center">
            <h1 className="text-4xl text-cyan-500  mb-4">Untitled Language Application</h1>
            <div className="bg-white rounded-xl w-6/8 h-7/8 items-center justify-center flex flex-col">
            {children}
            </div>
        </div>
    )
}

export default Container