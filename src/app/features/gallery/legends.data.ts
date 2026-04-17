import { LegendModel } from "./legend.model";

export const LEGENDS:LegendModel[] = [
  {
    id: crypto.randomUUID(),
    name: "Legolas",
    class: "Archer",
    level: 10,
    story: "A skilled archer from the elven realm.",
    quote: "The world is full of wonders.",
    stats: {
      force: 5,
      defense: 8,
      magic: 7
    }
  },
  {
    id: crypto.randomUUID(),
    name: "Gandalf",
    class: "Wizard", 
    level: 20,
    story: "A powerful wizard who guides the hero on their journey.",
    quote: "All we have to decide is what to do with the time that is given to us.",
    stats: {
      force: 3,
      defense: 5,
      magic: 10
    }
  },
  {
    id: crypto.randomUUID(),
    name: "Aragorn",
    class: "Warrior",
    level: 15,
    story: "A brave warrior and rightful heir to the throne.",
    quote: "I am Aragorn son of Arathorn, and if by life or death I can save you, I will.",
    stats: {
      force: 8,
      defense: 7,
      magic: 2
    }
  },
  {
    id: crypto.randomUUID(),
    name: "Frodo",
    class: "Rogue",
    level: 5,
    story: "A humble hobbit who carries a powerful ring to its destruction.",
    quote: "I will take the Ring, though I do not know the way.",
    stats: {
      force: 2,
      defense: 3,
      magic: 5
    }
  }
]