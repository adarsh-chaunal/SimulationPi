import { useEffect, useRef } from "react";
import ContourProps from "../../../interfaces/plot/ContourProps";

const Contour: React.FC<ContourProps> = ({ data, width, height, levels, colorScheme }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        drawContourPlot();
    }, [data, levels, colorScheme]);

    levels = levels ?? 10;

    const drawContourPlot = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        const minValue = Math.min(...data.flat());
        const maxValue = Math.max(...data.flat());
        const step = (maxValue - minValue) / levels;

        const colors = colorScheme || generateDefaultColorScheme(levels);

        // Draw contours
        for (let level = 0; level < levels; level++) {
            const threshold = minValue + level * step;
            ctx.beginPath();
            ctx.fillStyle = colors[level];

            for (let y = 0; y < data.length - 1; y++) {
                for (let x = 0; x < data[y].length - 1; x++) {
                    const cell = [
                        { x, y, value: data[y][x] },
                        { x: x + 1, y, value: data[y][x + 1] },
                        { x: x + 1, y: y + 1, value: data[y + 1][x + 1] },
                        { x, y: y + 1, value: data[y + 1][x] }
                    ];

                    drawContour(ctx, cell, threshold, width, height, data.length, data[0].length);
                }
            }
        }
    }

    const generateDefaultColorScheme = (levels: number) => {
        const colors = [];
        for (let i = 0; i < levels; i++) {
            const value = Math.floor((255 * i) / levels);
            colors.push(`rgb(${value}, ${255 - value}, 255)`);
        }
        return colors;
    };

    const drawContour = (
        ctx: CanvasRenderingContext2D,
        cell: { x: number; y: number; value: number }[],
        threshold: number,
        canvasWidth: number,
        canvasHeight: number,
        dataHeight: number,
        dataWidth: number
    ) => {
        const scaleX = canvasWidth / dataWidth;
        const scaleY = canvasHeight / dataHeight;

        const points = [];

        for (let i = 0; i < 4; i++) {
            const p1 = cell[i];
            const p2 = cell[(i + 1) % 4];

            if ((p1.value < threshold && p2.value >= threshold) || (p1.value >= threshold && p2.value < threshold)) {
                const t = (threshold - p1.value) / (p2.value - p1.value);
                const x = p1.x + t * (p2.x - p1.x);
                const y = p1.y + t * (p2.y - p1.y);
                points.push({ x: x * scaleX, y: y * scaleY });
            }
        }

        if (points.length === 2) {
            ctx.moveTo(points[0].x, points[0].y);
            ctx.lineTo(points[1].x, points[1].y);
            ctx.stroke();
        }
    };

    return (
        <div className="content" style={{ width: width, height: height }}>
            <div className="canvas-container" style={{ width: width, height: height }}>
                <canvas ref={canvasRef} width={width} height={height} />
            </div>
        </div>
    )
}

export default Contour;