export interface AdventurerModel {
  id: string;
  name: string;
  level: number;
  type: 'warrior' | 'magician' | 'elf';
  stats: {
    xp: number;
    hp: number;
    strength: number;
    intelligence: number;
  };
}

