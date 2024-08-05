import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { OmokItem } from "types/omok";
import { isCellOccupied } from "./Cell/helper";

interface GridContextValue {
  grid: OmokItem[];
  handleAddOmokItem: (item: OmokItem) => void;
}

const GridContext = createContext<GridContextValue | null>(null);

export const useGirdContext = () => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("useGirdContext must be used within a GridProvider");
  }

  return context;
};

export const GirdContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [grid, setGrid] = useState<OmokItem[]>([]);

  const handleClearGrid = () => setGrid([]);

  const handleAddOmokItem = (item: OmokItem) => {
    setGrid((prev) => {
      if (!prev) return prev;

      const isOccupied = isCellOccupied({
        coordinate: item,
        omokItemList: prev,
      });

      if (isOccupied) {
        return prev;
      } else {
        [...prev, item];
      }
    });
  };

  const context = useMemo(
    () => ({ grid, handleAddOmokItem, handleClearGrid }),
    [grid]
  );

  return (
    <GridContext.Provider value={context}>{children}</GridContext.Provider>
  );
};
