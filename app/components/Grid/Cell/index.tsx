import { FC, MouseEventHandler, useCallback, useRef } from "react";
import {
  isFirstQuadrant,
  isFourthQuadrant,
  isSecondQuadrant,
  isThirdQuadrant,
} from "./helper";
import { Coordinate, OmokItem } from "types/omok";
import { twMerge } from "tailwind-merge";
import { useGridStore } from "../store";

const CELL_SIZE = 50;

interface Props {
  coordinate: Coordinate;
  omokItem: OmokItem | undefined;
  isEdge?: boolean;
}

const Cell: FC<Props> = ({ coordinate, isEdge, omokItem }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const addOmokItem = useGridStore((state) => state.addOmokItem);

  const handleClickCell: MouseEventHandler = useCallback(
    (e) => {
      if (!ref.current) return;
      const { x: offsetX, y: offsetY } = ref.current.getBoundingClientRect();
      const { clientX, clientY } = e;

      const XAxisPercent = Math.max(clientX - offsetX, 0) / CELL_SIZE;
      const YAxisPercent = Math.max(clientY - offsetY, 0) / CELL_SIZE;

      const updatedAt = new Date();

      if (isFirstQuadrant(XAxisPercent, YAxisPercent)) {
        addOmokItem({
          updatedAt,
          x: coordinate.x,
          y: coordinate.y + 1,
        });
      } else if (isSecondQuadrant(XAxisPercent, YAxisPercent)) {
        addOmokItem({
          updatedAt,
          x: coordinate.x,
          y: coordinate.y,
        });
      } else if (isThirdQuadrant(XAxisPercent, YAxisPercent)) {
        addOmokItem({
          updatedAt,
          x: coordinate.x + 1,
          y: coordinate.y,
        });
        return;
      } else if (isFourthQuadrant(XAxisPercent, YAxisPercent)) {
        addOmokItem({
          updatedAt,
          x: coordinate.x + 1,
          y: coordinate.y + 1,
        });
      }
    },
    [coordinate.x, coordinate.y, addOmokItem]
  );

  return (
    <td className={twMerge("p-0 border-black border", isEdge && "border-none")}>
      <button
        ref={ref}
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
        }}
        className={twMerge(
          "block relative",
          isEdge ? "bg-transparent" : "bg-amber-400 cursor-pointer"
        )}
        disabled={isEdge}
        onClick={handleClickCell}
      >
        {coordinate.x}, {coordinate.y}
        {omokItem && (
          <Stone stoneColor={omokItem.player === "나" ? "BLACK" : "WHITE"} />
        )}
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
        "rounded-full absolute z-10 -top-1/2 translate-y-1/2 -left-1/2 translate-x-1/2 shadow",
        stoneColor === "BLACK" ? "bg-black" : "bg-white"
      )}
    />
  );
};
