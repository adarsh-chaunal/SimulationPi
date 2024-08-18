import { useEffect, useRef, useState } from 'react';
import './HomeAnimation.css';

const gravity = 0.1;
const friction = 0.99;

interface Apple {
    id: number;
    xPosition: number;
    yPosition: number;
    xVelocity: number;
    yVelocity: number;
    appleSize: number;
    color: string;
    isDragging: boolean;
}

function HomeAnimation() {

    const [apples, setApples] = useState<Apple[]>([]);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const applesRef = useRef<Apple[]>([]);
    const isDraggingRef = useRef<boolean>(false);
    const dragAppleRef = useRef<Apple | null>(null);
    const offsetXRef = useRef<number>(0);
    const offsetYRef = useRef<number>(0);
    const startDragPosition = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context) return;

        const resizeCanvas = () => {
            const container = canvas.parentElement;
            if (container) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Initialize apples. This will change when we will add the tree.
        const initialApples = [
            { id: 0, xPosition: 100, yPosition: 100, xVelocity: 0, yVelocity: 0, appleSize: 20, color: 'red', isDragging: false },
            { id: 1, xPosition: 200, yPosition: 100, xVelocity: 0, yVelocity: 0, appleSize: 20, color: 'red', isDragging: false },
            { id: 2, xPosition: 300, yPosition: 100, xVelocity: 0, yVelocity: 0, appleSize: 20, color: 'red', isDragging: false },
        ];

        applesRef.current = initialApples;
        setApples([...applesRef.current]);

        const addApple = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const xPosition = event.clientX - rect.left;
            const yPosition = event.clientY - rect.top;
            const appleSize = 20;
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

            const newApple = { id: applesRef.current.length, xPosition, yPosition, xVelocity: 0, yVelocity: 0, appleSize, color, isDragging: false };
            applesRef.current.push(newApple);
            setApples([...applesRef.current]); // Trigger re-render
        };

        const animate = () => {
            if (!context) return;

            context.clearRect(0, 0, canvas.width, canvas.height);

            applesRef.current.forEach((apple) => {
                if (!apple.isDragging) {
                    apple.yVelocity += gravity;
                    apple.xVelocity *= friction;
                    apple.yVelocity *= friction;
                    apple.xPosition += apple.xVelocity;
                    apple.yPosition += apple.yVelocity;

                    if (apple.xPosition + apple.appleSize > canvas.width || apple.xPosition - apple.appleSize < 0) {
                        apple.xVelocity = -apple.xVelocity;
                    }

                    if (apple.yPosition + apple.appleSize > canvas.height) {
                        apple.yPosition = canvas.height - apple.appleSize;
                        apple.yVelocity = -apple.yVelocity * friction;
                    } else if (apple.yPosition - apple.appleSize < 0) {
                        apple.yVelocity = -apple.yVelocity;
                    }
                }

                // Draw apple body (two overlapping ovals)
                const widthFactor = 1.2; // Width of the ovals relative to their height
                const heightFactor = 1.4; // Height of the ovals relative to apple size

                // Draw the left oval
                context.beginPath();
                context.ellipse(
                    apple.xPosition - apple.appleSize / 2,
                    apple.yPosition,
                    apple.appleSize * widthFactor,
                    apple.appleSize * heightFactor,
                    0,
                    0,
                    Math.PI * 2
                );
                context.fillStyle = apple.color;
                context.fill();
                context.closePath();

                // Draw the right oval
                context.beginPath();
                context.ellipse(
                    apple.xPosition + apple.appleSize / 2,
                    apple.yPosition,
                    apple.appleSize * widthFactor,
                    apple.appleSize * heightFactor,
                    0,
                    0,
                    Math.PI * 2
                );
                context.fillStyle = apple.color;
                context.fill();
                context.closePath();

                // Draw stem
                const stemHeight = apple.appleSize / 2;
                const stemWidth = apple.appleSize / 6;
                context.beginPath();
                context.rect(
                    apple.xPosition - stemWidth / 2,
                    apple.yPosition - apple.appleSize * heightFactor - stemHeight,
                    stemWidth,
                    stemHeight
                );
                context.fillStyle = 'brown';
                context.fill();
                context.closePath();

                // Draw leaf
                const leafWidth = apple.appleSize / 2;
                const leafHeight = apple.appleSize / 3;
                context.beginPath();
                context.ellipse(
                    apple.xPosition + apple.appleSize / 2,
                    apple.yPosition - apple.appleSize * heightFactor - stemHeight / 2,
                    leafWidth,
                    leafHeight,
                    Math.PI / 4,
                    0,
                    Math.PI * 2
                );
                context.fillStyle = 'green';
                context.fill();
                context.closePath();
            });

            requestAnimationFrame(animate);
        };

        const startDrag = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const apple = applesRef.current.find(
                (apple) => Math.hypot(apple.xPosition - mouseX, apple.yPosition - mouseY) < apple.appleSize
            );

            if (apple) {
                isDraggingRef.current = true;
                dragAppleRef.current = apple;
                offsetXRef.current = mouseX - apple.xPosition;
                offsetYRef.current = mouseY - apple.yPosition;
                apple.isDragging = true;
                startDragPosition.current = { x: mouseX, y: mouseY };
                startTimeRef.current = Date.now();
            }
        };

        const onDrag = (event: MouseEvent) => {
            if (!isDraggingRef.current || !dragAppleRef.current) return;

            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            dragAppleRef.current.xPosition = mouseX - offsetXRef.current;
            dragAppleRef.current.yPosition = mouseY - offsetYRef.current;
        };

        const endDrag = (event: MouseEvent) => {
            if (dragAppleRef.current) {
                const rect = canvas.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;

                const dx = mouseX - startDragPosition.current.x;
                const dy = mouseY - startDragPosition.current.y;
                const dt = (Date.now() - startTimeRef.current) / 10; // time in seconds

                dragAppleRef.current.xVelocity = dx / dt;
                dragAppleRef.current.yVelocity = dy / dt;

                dragAppleRef.current.isDragging = false;
            }
            isDraggingRef.current = false;
            dragAppleRef.current = null;
        };

        canvas.addEventListener('mousedown', startDrag);
        canvas.addEventListener('mousemove', onDrag);
        canvas.addEventListener('mouseup', endDrag);
        canvas.addEventListener('mouseleave', endDrag);

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousedown', startDrag);
            canvas.removeEventListener('mousemove', onDrag);
            canvas.removeEventListener('mouseup', endDrag);
            canvas.removeEventListener('mouseleave', endDrag);
        };
    }, [])
    
    return (
        <div className='home-animation'>
            <canvas className = "home-animation-canvas" ref={canvasRef} />
        </div>
    );
}

export default HomeAnimation;