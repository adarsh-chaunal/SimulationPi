import PlotProps from "./PlotProps";

export default interface ContourProps extends PlotProps {
    data: any;
    levels: number | undefined;
    colorScheme?: string[];
}