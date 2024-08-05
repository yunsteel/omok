import { FC, MouseEventHandler, useCallback, useMemo, useRef } from "react";
import {
  isCellOccupied,
  isFirstQuadrant,
  isFourthQuadrant,
  isSecondQuadrant,
  isThirdQuadrant,
} from "./helper";
import { useGirdContext } from "../context";
import { Coordinate } from "../../../types/omok";
import { Player } from "../../../types/Player";

const CELL_SIZE = 40;

interface Props {
  coordinate: Coordinate;
  player: Player;
  onSwitchPlayer: () => void;
}

const Cell: FC<Props> = ({ coordinate, onSwitchPlayer, player }) => {
  const ref = useRef<HTMLTableCellElement>(null);

  const { handleAddOmokItem, grid } = useGirdContext();

  const hasOmokItem = useMemo(
    () => isCellOccupied({ coordinate, omokItemList: grid }),
    [coordinate, grid]
  );

  const handleClickCell: MouseEventHandler = useCallback(
    (e) => {
      if (!ref.current) return;
      const { x: offsetX, y: offsetY } = ref.current.getBoundingClientRect();
      const { clientX, clientY } = e;

      const XAxisPercent = Math.max(clientX - offsetX, 0) / CELL_SIZE;
      const YAxisPercent = Math.max(clientY - offsetY, 0) / CELL_SIZE;

      const updatedAt = new Date();

      if (isFirstQuadrant(XAxisPercent, YAxisPercent)) {
        handleAddOmokItem({
          player,
          updatedAt,
          x: coordinate.x,
          y: coordinate.y + 1,
        });
      } else if (isSecondQuadrant(XAxisPercent, YAxisPercent)) {
        handleAddOmokItem({
          player,
          updatedAt,
          x: coordinate.x,
          y: coordinate.y,
        });
      } else if (isThirdQuadrant(XAxisPercent, YAxisPercent)) {
        handleAddOmokItem({
          player,
          updatedAt,
          x: coordinate.x,
          y: coordinate.y + 1,
        });
        return;
      } else if (isFourthQuadrant(XAxisPercent, YAxisPercent)) {
        handleAddOmokItem({
          player,
          updatedAt,
          x: coordinate.x + 1,
          y: coordinate.y + 1,
        });
      }

      onSwitchPlayer();
    },
    [coordinate]
  );

  return (
    <td
      ref={ref}
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
      }}
      className="border cursor-pointer border-black hover:bg-black text-xs relative bg-amber-600"
      onClick={handleClickCell}
    >
      {hasOmokItem && (
        <span
          style={{
            width: CELL_SIZE / 2,
            height: CELL_SIZE / 2,
          }}
          className="bg-black rounded-full absolute left-1/2 top-1/2 translate-x-1/2 translate-y-1/2 z-10"
        />
      )}
      ({coordinate.x}, {coordinate.y})
    </td>
  );
};

export default Cell;
