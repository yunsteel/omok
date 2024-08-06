import type { MetaFunction } from "@remix-run/node";
import Grid from "~/components/Grid";
import GridSizeHandler from "~/components/Grid/SizeHandler";
import { useGridStore } from "~/components/Grid/store";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const gridStore = useGridStore((state) => state);

  return (
    <div className="font-sans p-4">
      <button onClick={gridStore.resetGame}>Reset</button>
      <GridSizeHandler />
      <Grid />

      {/* 임시 기록판 */}
      <div>
        {gridStore.grid
          .filter((rows) => rows.length > 0)
          .map((rows, x) => (
            <div key={x}>
              {rows
                .filter((row) => row)
                .map((cell) => (
                  <div key={cell.x + cell.player + cell.y}>
                    {cell.player} : {cell.x} {cell.y}
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}
