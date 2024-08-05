import { FC } from "react";
import Cell from "./Cell";
import { Player } from "types/Player";

const GRID_SIZE = 25;
const ROWS = Array(GRID_SIZE).fill(null);
const COLS = Array(GRID_SIZE).fill(null);

interface Props {
  player: Player;
  onSwitchPlayer: () => void;
}

const Grid: FC<Props> = ({ onSwitchPlayer, player }) => {
  return (
    <table>
      {ROWS.map((_, x) => (
        <tr key={x}>
          {COLS.map((_, y) => (
            <Cell
              key={`${x}${y}`}
              coordinate={{ x, y }}
              onSwitchPlayer={onSwitchPlayer}
              player={player}
            />
          ))}
        </tr>
      ))}
    </table>
  );
};

export default Grid;
