import { CircleX } from 'lucide-react';
import { useState } from 'react';

export const Error = () => {

    const [isClicked, setIsClicked] = useState(false);

    const displaySetter = isClicked == true? 'none' : 'block';

    return (
        <div className="border-2 rounded border-error bg-error-100 absolute top-6 right-6 px-10 py-6" style={ { display: displaySetter } }>
            <div className='flex flex-col items-center'>

                <h1 className="text-white flex justify-start">Error, the username cannot be empty</h1>
                <CircleX className='mt-1 cursor-pointer' color='white' onClick={(e) => {
                    e.preventDefault();
                    setIsClicked(true);
                }}/>

            </div>
        </div>
    );
}

