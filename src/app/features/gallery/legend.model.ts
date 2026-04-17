export interface LegendModel {
  id: string;
  name: string;
  class: string;
  level: number;
  story: string;
  quote: string;
  stats: {
    force: number;
    defense: number;
    magic: number;
  };
}