import { useEffect, useState } from "react";
import { QuiverData } from "../../interfaces/plots/QuiverProps";
import Plot from "../plots/Plot";

const ShowPlot: React.FC = () => {

    const contourData = [
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6]
    ];

    const [quiverData, setQuiverData] = useState<QuiverData>({
        x: [],
        y: [],
        u: [],
        v: []
    });

    useEffect(() => {
        const xStart = -Math.PI;
        const xEnd = Math.PI;
        const xIncrement = Math.PI/8;

        const yStart = -Math.PI;
        const yEnd = Math.PI;
        const yIncrement = Math.PI/8;

        //const xStart = 0;
        //const xEnd = 10;
        //const xIncrement = 0.5;

        //const yStart = 0;
        //const yEnd = 10;
        //const yIncrement = 0.5;

        if (xStart > xEnd) return;
        if (yStart > yEnd) return;
        if (xIncrement <= 0) return;
        if (yIncrement <= 0) return;

        const xVectorLength = Math.floor((xEnd - xStart) / xIncrement) + 1;
        const yVectorLength = Math.floor((yEnd - yStart) / yIncrement) + 1;

        if (xVectorLength > 10000) return;
        if (yVectorLength > 10000) return;

        const xMesh: number[][] = new Array(yVectorLength);
        const yMesh: number[][] = new Array(yVectorLength);

        for (let y = 0; y < yVectorLength; y++) {
            xMesh[y] = new Array(xVectorLength);
            yMesh[y] = new Array(xVectorLength);

            const yValue = yStart + yIncrement * y;

            for (let x = 0; x < xVectorLength; x++) {
                xMesh[y][x] = xStart + xIncrement * x;
                yMesh[y][x] = yValue;
            }
        }

        // now we will generate the vectors for these mesh

        const xComponent: number[][] = new Array(yVectorLength);
        const yComponent: number[][] = new Array(yVectorLength);

        for (let y = 0; y < yVectorLength; y++) {
            xComponent[y] = new Array(xVectorLength);
            yComponent[y] = new Array(yVectorLength);

            for (let x = 0; x < xVectorLength; x++) {
                xComponent[y][x] = Math.sin(yMesh[y][x]);
                yComponent[y][x] = Math.cos(xMesh[y][x]);
            }
        }

        setQuiverData({
            x: xMesh,
            y: yMesh,
            u: xComponent,
            v: yComponent
        });

    }, [])


  return (
      <div>
          {/*<h1>Contour Plot</h1>*/}
          {/*<Contour data={contourData} width={400} height={400} levels={5} />*/}

          <h1>Quiver Plot</h1>
          <Plot type={'quiver'} data={quiverData} width={700} height={600} showAxes={true} showLabels={true} />
      </div>
  );
}

export default ShowPlot;



// have to work on creating a common method for generating the mesh using start-end value with or without increment and number or points in a dimention, uniformaly and non uniformaly distributed
// another value the user can provide will be the x and y vector itself.