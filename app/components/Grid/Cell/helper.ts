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
