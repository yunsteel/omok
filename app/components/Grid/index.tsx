"use client";

import { FC } from "react";
import Cell from "./Cell";
import { useGridStore } from "./store";

interface Props {}

const Grid: FC<Props> = () => {
  const grid = useGridStore((state) => state.grid);

  return (
    <table>
      <tbody>
        {grid.map((rows, x) => (
          <tr key={"row" + x}>
            {rows.map((_, y) => (
              <Cell
                key={"cell" + x + y}
                coordinate={{ x, y }}
                omokItem={grid?.[x]?.[y]}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
