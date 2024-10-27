import React, { useEffect, useState } from 'react';
import './HeartAnimation.css';

const HeartAnimation = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts([
                { id: Date.now(), left: Math.random() * 100 + '%' },
            ]);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="heart-animation">
            {hearts.map((heart) => (
                <div key={heart.id} className="heart" style={{ left: heart.left }}></div>
            ))}
        </div>
    );
};

export default HeartAnimation;

