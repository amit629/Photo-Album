import React from 'react';

const Modals=({clickedImg,handleRotationRight,setClickedImage})=> {
    const handleClick=(e)=>{
        if(e.target.classList.contains("dismiss")){
            setClickedImage(null)
        }
    }
    return (
        <>
            <div className='overlay dismiss' onClick={handleClick}>
                <img src={clickedImg} alt="Bigger pic"/>
                <span className='dismiss' onClick={handleClick}>
                X
                </span>
                {/* <div onClick={handleRotationRight} className="overlay-arrows__left">
                    <div>
                        <svg
                        xmlns="http:/www.w3.org/2000/svg"
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        >
                        <path
                            fillRule='evenodd'
                            d="M9.707 16.707a1 1 0 01-1.414 ol-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />

                        </svg>
                    </div>
                </div> */}

            </div>
        </>
    )
}

export default Modals;