import Contour from './contour/Contour';
import Quiver from './quiver/Quiver';
import ContourProps from '../../interfaces/plot/ContourProps';
import QuiverProps from '../../interfaces/plot/QuiverProps';


type PlotType = 'contour' | 'quiver';

interface PlotProps {
    type: PlotType;
}

const Plot: React.FC<PlotProps & (ContourProps | QuiverProps)> = ({ type, ...props }) => {
    switch (type) {
        case 'contour':
            return <Contour { ...(props as ContourProps) }/>;
        //case 'heatmap':
        //    return <HeatmapPlot data={data} width={width} height={height} colorScheme={props.colorScheme} />;
        //case 'line':
        //    return <LineChart data={data} width={width} height={height} />;
        // Add cases for other plot types

        // Vector field plot
        case 'quiver':
            return <Quiver { ...(props as QuiverProps) } />
        default:
            return <div>Unknown plot type: {type}</div>;
    }
};

export default Plot;

//1. Scalar Field Plots
//      Contour Plots: To show iso - lines of constant values.
//      Heatmaps: To represent scalar fields using colors.
//2. Vector Field Plots
//      Arrow Plots: To display vectors in a grid.
//      Streamline Plots: To show the paths followed by particles in a vector field.
//      Quiver Plots: To represent vector fields using arrows.
//3. Complex Plots
//      Surface Plots: For 3D representation of data.
//      3D Mesh Plots: To show a wireframe view of 3D surfaces.
//      3D Contour Plots: To show contour lines in a 3D plot.
//4. Time - Series Plots
//      Line Charts: To show changes over time.
//      Scatter Plots: For visualizing data points over time.
//      Histogram Plots: For distribution of data over time intervals.
//5. Polar Plots
//      Radial Plots: For circular data visualization.
//      Polar Area Charts: To display values in polar coordinates.
//6. Statistical Plots
//      Box Plots: To show the distribution of data based on quartiles.
//      Histogram Plots: For data distribution.
//      Pie Charts: To represent proportions.
//7. Specialized Plots
//      Phase Space Plots: For dynamical systems analysis.
//      Bode Plots: For frequency response in control systems.
//      Nyquist Plots: To represent complex frequency response.
//8. Interactive Plots
//      Draggable Points: Allowing users to manipulate data points.
//      Zoomable and Pannable Plots: For detailed analysis.
//      Animated Plots: To show data changes over time dynamically.