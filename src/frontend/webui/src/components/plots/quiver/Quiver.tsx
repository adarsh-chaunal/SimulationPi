import React, { useEffect, useRef } from "react";
import QuiverProps from "../../../interfaces/plots/QuiverProps";
import { AXES, PLOT } from "../../../constants/plotConstants";
import { drawArrow, drawAxes } from "../../../utils/plotUtils";

const Quiver: React.FC<QuiverProps> = ({ data, width, height, showAxes, showLabels }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const padding = (showAxes ? AXES.TICK_PADDING : 0) + (showLabels ? AXES.LABEL_PADDING : 0);

    useEffect(() => {
        drawVectorFields();
    }, [data, width, height, showAxes, showLabels]);

    const drawVectorFields = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const canvasContext = canvas.getContext('2d');
        if (!canvasContext) return;

        canvasContext.clearRect(0, 0, width, height);

        if (!data.x.length ||
            !data.y.length ||
            !data.u.length ||
            !data.v.length) {
            canvasContext.font = PLOT.FONT;
            canvasContext.fillStyle = PLOT.FILL_STYLE; // can be string, CanvasGradient or CanvasPattern
            canvasContext.textAlign = PLOT.TEXT_ALIGN as CanvasTextAlign;
            canvasContext.fillText(PLOT.NO_DATA_TEXT, width / 2, height / 2);
            return;
        }

        const minX = Math.min(...data.x.flat());
        const minY = Math.min(...data.y.flat());
        const maxX = Math.max(...data.x.flat());
        const maxY = Math.max(...data.y.flat());

        const normalizationFactorX = (width - 2 * padding) / (maxX - minX);
        const normalizationFactorY = (height - 2 * padding) / (maxY - minY);

        const maxU = Math.max(...data.u.flat());
        const maxV = Math.max(...data.v.flat());

        const normalizationFactorU = ((width - 2 * padding) / data.x[0].length) / maxU;
        const normalizationFactorV = ((height - 2 * padding) / data.y.length) / maxV;
        const normalizationFactorUV = Math.min(normalizationFactorU, normalizationFactorV);

        for (let i = 0; i < data.x.length; i++) {
            for (let j = 0; j < data.x[i].length; j++) {

                const x = padding + (data.x[i][j] - minX) * normalizationFactorX;
                const y = padding + (data.y[i][j] - minY) * normalizationFactorY;
                let u = data.u[i][j] * normalizationFactorUV;
                let v = data.v[i][j] * normalizationFactorUV;

                if (x + u > width - padding || x + u < padding || y + v > height - padding || y + v < padding) {
                    u = 0;
                    v = 0;
                }

                drawArrow(canvasContext, x, y, u, v);
            }
        }

        if (showAxes) drawAxes(canvasContext, minX, maxX, minY, maxY, width, height, showLabels);
    }
    
    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} style={{border:"1px solid white"}} />
        </div>
    );
}

export default Quiver;