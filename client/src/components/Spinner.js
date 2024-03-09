import React from 'react'

function Spinner() {
    const styles = `
        .loader {
        width: 50px;
        aspect-ratio: 1;
        display: grid;
        border: 4px solid #0000;
        border-radius: 50%;
        border-right-color: #1F8B59;
        animation: l15 1s infinite linear;
        }
        .loader::before,
        .loader::after {    
        content: "";
        grid-area: 1/1;
        margin: 2px;
        border: inherit;
        border-radius: 50%;
        animation: l15 2s infinite;
        }
        .loader::after {
        margin: 8px;
        animation-duration: 3s;
        }
        @keyframes l15{ 
        100%{transform: rotate(1turn)}
        }
    `;

    return (
        <div className='fixed inset-0 bg-black z-[9999] flex justify-center items-center opacity-60'>
            <style>{styles}</style>
            <div className="loader"></div>
        </div>
    )
}

export default Spinner