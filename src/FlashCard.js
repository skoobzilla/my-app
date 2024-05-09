import React, { useState, useEffect, useRef } from 'react';

export default function Flashcard({ flashcard }) {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');
    const frontEl = useRef();
    const backEl = useRef();

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100)); // Corrected typo in Math.max
    }

    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options]);

    useEffect(() => {
        window.addEventListener('resize', setMaxHeight); // Corrected typo in addEventListener
        return () => window.removeEventListener('resize', setMaxHeight);
    }, []);

    return (
        <div
            className={`card ${flip ? 'flip' : ''}`}
            style={{ height: height }}
            onClick={() => setFlip(!flip)}
        >
            <div className="front" ref={frontEl}>
                {flashcard.question}
                <div className="flashcard-options">
                    {/* Use 'option' instead of 'options' inside the map function */}
                    {flashcard.options.map(option => {
                        return <div className="flashcard-option" key={option}>{option}</div>; // Added key prop
                    })}
                </div>
            </div>
            <div className="back" ref={backEl}>{flashcard.answer}</div>
        </div>
    );
}