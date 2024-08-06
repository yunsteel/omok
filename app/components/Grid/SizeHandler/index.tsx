import { FC, useCallback, useState } from "react";
import { DEFAULT_GRID_SIZE, useGridStore } from "../store";

interface Props {}

const GridSizeHandler: FC<Props> = () => {
  const [size, setSize] = useState(DEFAULT_GRID_SIZE);

  const isEmpty = useGridStore((state) => state.isEmpty);
  const handleChangeGirdSize = useGridStore((state) => state.setGridSize);

  const handleClickChange = useCallback(() => {
    if (isEmpty) {
      handleChangeGirdSize(size);
      return;
    }
    const isConfirmed = confirm("게임을 초기화하고 사이즈를 변경하시겠습니까?");
    if (isConfirmed) {
      handleChangeGirdSize(size);
    }
  }, [handleChangeGirdSize, isEmpty, size]);

  return (
    <div className="flex">
      <input
        className="border border-slate-300"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />
      <button onClick={handleClickChange}>변경</button>
    </div>
  );
};

export default GridSizeHandler;
