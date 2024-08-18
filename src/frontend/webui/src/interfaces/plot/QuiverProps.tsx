import PlotProps from "./PlotProps";

export interface QuiverData {
    x: number[][];
    y: number[][];
    u: number[][];
    v: number[][];
}

export default interface QuiverProps extends PlotProps {
    data: QuiverData;
}