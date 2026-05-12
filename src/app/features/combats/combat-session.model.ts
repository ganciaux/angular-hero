import { HeroModel } from "../hero/hero.model";
import { EnemyModel } from "./enemy.model";

export interface CombatSessionModel {
  hero: HeroModel;
  enemy: EnemyModel;
  turn: number;
}