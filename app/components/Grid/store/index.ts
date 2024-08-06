import { Coordinate, OmokItem } from "types/omok";
import { create } from "zustand";
import { isCellOccupied } from "../Cell/helper";
import { Player } from "types/Player";

interface State {
  grid: OmokItem[];
  player: Player;
}

interface Action {
  addOmokItem: (item: Omit<OmokItem, "player">) => void;
  clearGame: () => void;
  getOmokItem: (coordinate: Coordinate) => OmokItem | undefined;
}

export const useGridStore = create<State & Action>()((set, get) => ({
  player: "나",
  grid: [],
  addOmokItem: (omokItem) => {
    const nextPlayer = get().player === "나" ? "상대" : "나";

    set((state) => {
      const isOccupied = isCellOccupied({
        coordinate: omokItem,
        omokItemList: state.grid,
      });

      if (isOccupied) {
        return state;
      }

      return { grid: state.grid.concat({ ...omokItem, player: nextPlayer }) };
    });
    set(() => ({ player: nextPlayer }));
  },
  clearGame: () => set({ grid: [] }),
  getOmokItem: ({ x, y }) =>
    get().grid.find((item) => item.x === x && item.y === y),
}));
