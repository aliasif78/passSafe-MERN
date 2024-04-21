import React from 'react'

const Footer = () => {
    return (
        <footer className='flex flex-col sm:flex-row mt-[30vh] text-xs justify-center items-center align-middle text-center w-full h-fit p-2 bg-neutral-950 text-neutral-500 cursor-default'>
            <span className="about mr-[0.4%]">&copy; 2024 All Rights Reserved | Open Source | </span>
            <div className="invert flex flex-row gap-2 items-center align-middle text-center">
                <a href="https://lordicon.com/">Icons by Lordicon.com</a>
                <lord-icon
                    src="https://cdn.lordicon.com/lomfljuq.json"
                    trigger="hover"
                    style={{ width: "20px", height: "20px" }}>
                </lord-icon>
            </div>
        </footer>
    )
}

export default Footer