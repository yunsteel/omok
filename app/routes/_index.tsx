"use client";

import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Player } from "types/Player";
import Grid from "~/components/Grid";
import { GirdContextProvider } from "~/components/Grid/context";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [player, setPlayer] = useState<Player>("나");

  return (
    <div className="font-sans p-4">
      <GirdContextProvider>
        <Grid
          onSwitchPlayer={() =>
            setPlayer((prev) => (prev === "나" ? "상대" : "나"))
          }
          player={player}
        />
      </GirdContextProvider>
    </div>
  );
}
