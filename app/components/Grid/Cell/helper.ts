import { Coordinate, OmokItem } from "../../../types/omok";

const ZERO_POINT = 0.5;

export const isFirstQuadrant = (x: number, y: number) => {
  return x > ZERO_POINT && y < ZERO_POINT;
};

export const isSecondQuadrant = (x: number, y: number) => {
  return x < ZERO_POINT && y < ZERO_POINT;
};

export const isThirdQuadrant = (x: number, y: number) => {
  return x < ZERO_POINT && y >= ZERO_POINT;
};

export const isFourthQuadrant = (x: number, y: number) => {
  return x >= ZERO_POINT && y >= ZERO_POINT;
};

interface Params {
  coordinate: Coordinate;
  omokItemList: OmokItem[];
}
export const isCellOccupied = ({ coordinate, omokItemList }: Params) => {
  return omokItemList.some(
    (item) => item.x === coordinate.x && item.y === coordinate.y
  );
};
