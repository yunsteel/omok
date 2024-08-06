import { FC } from "react";
import Cell from "./Cell";
import { useGridStore } from "./store";

const GRID_SIZE = 5;
const ROWS = Array(GRID_SIZE + 1).fill(null);
const COLS = Array(GRID_SIZE + 1).fill(null);

interface Props {}

const Grid: FC<Props> = () => {
  const getOmokItem = useGridStore((state) => state.getOmokItem);

  return (
    <table>
      <tbody>
        {ROWS.map((_, x) => (
          <tr key={"row" + x}>
            {COLS.map((_, y) => (
              <Cell
                key={`${x}${y}`}
                coordinate={{ x, y }}
                omokItem={getOmokItem({ x, y })}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
