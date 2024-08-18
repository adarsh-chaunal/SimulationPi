import { ARROW, AXES } from "../constants/plotConstants";

export const drawAxes = (canvasContext: CanvasRenderingContext2D,
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
    width: number,
    height: number,
    padding: number) => {
    const normalizationFactorX = (width - 2 * padding) / (maxX - minX);
    const normalizationFactorY = (height - 2 * padding) / (maxY - minY);

    const xAxisY = height - padding;// - (0 - minY) * normalizationFactorY; // Y position of the X-Axis
    canvasContext.beginPath();
    canvasContext.moveTo(padding, xAxisY);
    canvasContext.lineTo(width - padding, xAxisY);
    canvasContext.stroke();

    const yAxisX = padding; // + (0 - minX) * normalizationFactorX; // X position of the Y-Axis
    canvasContext.beginPath();
    canvasContext.moveTo(yAxisX, padding);
    canvasContext.lineTo(yAxisX, height - padding);
    canvasContext.stroke();

    const xTickInterval = (maxX - minX) / AXES.NUMBER_OF_TICKS;

    for (let i = minX; i <= maxX; i += xTickInterval) {
        const xPos = padding + (i - minX) * normalizationFactorX;

        canvasContext.beginPath();
        canvasContext.moveTo(xPos, xAxisY - 5);
        canvasContext.lineTo(xPos, xAxisY + 5);
        canvasContext.stroke();

        canvasContext.font = AXES.TICK_NUMBER_FONT;
        canvasContext.fillStyle = AXES.TICK_NUMBER_FILL_STYLE;
        canvasContext.textAlign = AXES.TICK_X_AXIS_NUMBER_ALIGN as CanvasTextAlign;
        canvasContext.fillText(i.toFixed(AXES.TICK_NUMBER_FRACTION_DIGITS), xPos, xAxisY + 20);
    }

    const yTickInterval = (maxY - minY) / AXES.NUMBER_OF_TICKS;

    for (let i = minY; i <= maxY; i += yTickInterval) {
        const yPos = height - padding - (i - minY) * normalizationFactorY;

        canvasContext.beginPath();
        canvasContext.moveTo(yAxisX - 5, yPos);
        canvasContext.lineTo(yAxisX + 5, yPos);
        canvasContext.stroke();

        canvasContext.font = AXES.TICK_NUMBER_FONT;
        canvasContext.fillStyle = AXES.TICK_NUMBER_FILL_STYLE;
        canvasContext.textAlign = AXES.TICK_Y_AXIS_NUMBER_ALIGN as CanvasTextAlign;
        canvasContext.fillText(i.toFixed(AXES.TICK_NUMBER_FRACTION_DIGITS), yAxisX - 10, yPos + 3);
    }
}

export const drawArrow = (canvasContext: CanvasRenderingContext2D,
    x: number,
    y: number,
    u: number,
    v: number,
    arrowLineWidth: number = ARROW.DEFAULT_LINE_WIDTH) => {
    const arrowLength = Math.sqrt(u * u + v * v);

    canvasContext.beginPath();
    canvasContext.moveTo(x, y);
    canvasContext.lineTo(x + u, y + v);

    const arrowAngle = Math.atan2(v, u);
    const arrowHeadLength = arrowLength * ARROW.RATIO_OF_ARROW_HEAD_AND_ARROW_LENGTH; // the line of arrow head will be 25 % of arrow length.

    canvasContext.lineTo(
        x + u - arrowHeadLength * Math.cos(arrowAngle - Math.PI / 6),
        y + v - arrowHeadLength * Math.sin(arrowAngle - Math.PI / 6)
    )

    canvasContext.moveTo(x + u, y + v);
    canvasContext.lineTo(
        x + u - arrowHeadLength * Math.cos(arrowAngle + Math.PI / 6),
        y + v - arrowHeadLength * Math.sin(arrowAngle + Math.PI / 6)
    );

    canvasContext.strokeStyle = ARROW.STROKE_STYLE; // can be string, CanvasGradient or CanvasPattern
    canvasContext.lineWidth = arrowLineWidth;
    canvasContext.stroke();
}