import { OmokItem } from "types/omok";
import { create } from "zustand";
import { Player } from "types/Player";
import { produce } from "immer";

interface State {
  grid: OmokItem[][];
  girdSize: number;
  player: Player;
  isEmpty: boolean;
}

interface Action {
  addStone: (item: Omit<OmokItem, "player">) => void;
  resetGame: () => void;
  setGridSize: (size: number) => void;
}

export const DEFAULT_GRID_SIZE = 5;

export const useGridStore = create<State & Action>()((set, get) => ({
  player: "나",
  girdSize: DEFAULT_GRID_SIZE,
  grid: Array(DEFAULT_GRID_SIZE + 1)
    .fill(null)
    .map(() => Array(DEFAULT_GRID_SIZE + 1).fill(null)),
  isEmpty: get()?.grid.every((rows) => rows.every((cell) => !cell)),

  setGridSize: (size: number) => set({ girdSize: size }),
  addStone: (omokItem) => {
    const player = get().player === "나" ? "상대" : "나";
    const { x, y } = omokItem;

    if (x === 0 || y === 0 || x > get().girdSize || y > get().girdSize) {
      return;
    }

    set((state) => {
      const isOccupied = Boolean(state.grid[x][y]);

      if (isOccupied) {
        return state;
      }

      return produce(state, (draft) => {
        draft.grid[x][y] = { ...omokItem, player };
      });
    });

    set(() => ({ player }));
  },
  resetGame: () => set({ grid: [] }),
}));
