import { FC, MouseEventHandler, useCallback, useRef } from "react";
import {
  isFirstQuadrant,
  isFourthQuadrant,
  isSecondQuadrant,
  isThirdQuadrant,
} from "./helper";
import { useGirdContext } from "../context";
import { Coordinate } from "types/omok";
import { Player } from "types/Player";
import { twMerge } from "tailwind-merge";

const CELL_SIZE = 50;

interface Props {
  coordinate: Coordinate;
  player: Player;
  onSwitchPlayer: () => void;
  isOccupied: boolean;
}

const Cell: FC<Props> = ({
  coordinate,
  onSwitchPlayer,
  player,
  isOccupied,
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const { handleAddOmokItem } = useGirdContext();

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
    [coordinate.x, coordinate.y, handleAddOmokItem, onSwitchPlayer, player]
  );

  return (
    <td className="p-0 border-black border">
      <button
        ref={ref}
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
        }}
        className="block cursor-pointer relative bg-amber-600"
        onClick={handleClickCell}
      >
        {isOccupied && <Stone stoneColor="BLACK" />}
      </button>
    </td>
  );
};

export default Cell;

interface StoneProps {
  stoneColor: "BLACK" | "WHITE";
}

const Stone: FC<StoneProps> = ({ stoneColor }) => {
  return (
    <span
      style={{
        width: CELL_SIZE / 2,
        height: CELL_SIZE / 2,
      }}
      className={twMerge(
        "rounded-full absolute z-10 -top-1/2 translate-y-1/2 -left-1/2 translate-x-1/2",
        stoneColor === "BLACK" ? "bg-black" : "bg-white"
      )}
    />
  );
};
