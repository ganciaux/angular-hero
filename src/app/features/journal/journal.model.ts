export interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  type: 'xp' | 'hp' | 'equip' | 'other' | 'level';
}