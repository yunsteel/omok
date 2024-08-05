import { Player } from "./Player";

export interface Coordinate {
  x: number;
  y: number;
}

export interface OmokItem extends Coordinate {
  player: Player;
  updatedAt: Date;
}
