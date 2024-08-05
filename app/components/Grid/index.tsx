import { FC } from "react";
import Cell from "./Cell";
import { Player } from "types/Player";
import { isCellOccupied } from "./Cell/helper";
import { useGirdContext } from "./context";

const GRID_SIZE = 5;
const ROWS = Array(GRID_SIZE).fill(null);
const COLS = Array(GRID_SIZE).fill(null);

interface Props {
  player: Player;
  onSwitchPlayer: () => void;
}

const Grid: FC<Props> = ({ onSwitchPlayer, player }) => {
  const { grid } = useGirdContext();

  return (
    <table>
      <tbody>
        {ROWS.map((_, x) => (
          <tr key={"row" + x}>
            {COLS.map((_, y) => (
              <Cell
                key={`${x}${y}`}
                coordinate={{ x, y }}
                onSwitchPlayer={onSwitchPlayer}
                player={player}
                isOccupied={isCellOccupied({
                  omokItemList: grid,
                  coordinate: { x, y },
                })}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
