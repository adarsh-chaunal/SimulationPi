import './HomeTitle.css'
import { useEffect, useRef } from 'react'

function HomeTitle() {
    const spaceBackground = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const space = spaceBackground.current;

        if (!space) return;

        const numberOfStars = 500;

        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');

            star.classList.add('star-space-background');

            const starSize = Math.random() * 4 + 1; // size between 1 and 5
            const duration = Math.random() * 5 + 5;

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * window.innerWidth;

            const xPosition = Math.cos(angle) * distance;
            const yPosition = Math.sin(angle) * distance;

            star.style.width = `${starSize}px`;
            star.style.height = `${starSize}px`;
            star.style.left = '50%';
            star.style.top = '50%';
            star.style.transform = `translate(-50%, -50%)`;

            star.style.setProperty('--x', `${xPosition}px`);
            star.style.setProperty('--y', `${yPosition}px`);

            star.style.animation = `zoom ${20}s linear infinite, 
            move ${duration}s linear infinite`;

            space.appendChild(star);
        }


        const style = document.createElement('style');
        style.textContent = `
                @keyframes zoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(5); }
                }
                @keyframes move {
                    0% { transform: translate(-50%, -50%) translate(0, 0); }
                    100% { transform: translate(-50%, -50%) translate(var(--x), var(--y)); 
                }`;
        document.head.appendChild(style);

        return () => {
            if (space) {
                while (space.firstChild) {
                    space.removeChild(space.firstChild);
                }
            }
        };

    }, [])

    return (
        <>
            <div className="card bg-dark text-white rounded-0" >
                <div className="space-background card-img" ref={spaceBackground}></div>
                <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center">
                    <h1 className="card-title display-1 mb-0">Simulation</h1>
                    <div className="card-text pi-progress text-truncate w-100">{Math.PI.toPrecision(50).toString()}</div>
                </div>
            </div>
        </>
    );
}

export default HomeTitle;
