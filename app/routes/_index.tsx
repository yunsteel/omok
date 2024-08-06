"use client";

import type { MetaFunction } from "@remix-run/node";
import Grid from "~/components/Grid";
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
      <button onClick={gridStore.clearGame}>Reset</button>
      <Grid />

      {/* 임시 기록판 */}
      <div>
        {gridStore.grid.map((item) => (
          <div key={JSON.stringify(item)}>
            {item.player}: {item.x}, {item.y}
          </div>
        ))}
      </div>
    </div>
  );
}
