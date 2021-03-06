import { Note } from "./note";

export class Notes {
  public static readonly NOTES: Array<Note> = [
    new Note("A0", "A", 0, 21),
    new Note("Bb0", "BB", 0, 22),
    new Note("B0", "B", 0, 23),
    new Note("C1", "C", 1, 24),
    new Note("Db1", "DB", 1, 25),
    new Note("D1", "D", 1, 26),
    new Note("Eb1", "EB", 1, 27),
    new Note("E1", "E", 1, 28),
    new Note("F1", "F", 1, 29),
    new Note("Gb1", "GB", 1, 30),
    new Note("G1", "G", 1, 31),
    new Note("Ab1", "AB", 1, 32),
    new Note("A1", "A", 1, 33),
    new Note("Bb1", "BB", 1, 34),
    new Note("B1", "B", 1, 35),
    new Note("C2", "C", 2, 36),
    new Note("Db2", "DB", 2, 37),
    new Note("D2", "D", 2, 38),
    new Note("Eb2", "EB", 2, 39),
    new Note("E2", "E", 2, 40),
    new Note("F2", "F", 2, 41),
    new Note("Gb2", "GB", 2, 42),
    new Note("G2", "G", 2, 43),
    new Note("Ab2", "AB", 2, 44),
    new Note("A2", "A", 2, 45),
    new Note("Bb2", "BB", 2, 46),
    new Note("B2", "B", 2, 47),
    new Note("C3", "C", 3, 48),
    new Note("Db3", "DB", 3, 49),
    new Note("D3", "D", 3, 50),
    new Note("Eb3", "EB", 3, 51),
    new Note("E3", "E", 3, 52),
    new Note("F3", "F", 3, 53),
    new Note("Gb3", "GB", 3, 54),
    new Note("G3", "G", 3, 55),
    new Note("Ab3", "AB", 3, 56),
    new Note("A3", "A", 3, 57),
    new Note("Bb3", "BB", 3, 58),
    new Note("B3", "B", 3, 59),
    new Note("C4", "C", 4, 60),
    new Note("Db4", "DB", 4, 61),
    new Note("D4", "D", 4, 62),
    new Note("Eb4", "EB", 4, 63),
    new Note("E4", "E", 4, 64),
    new Note("F4", "F", 4, 65),
    new Note("Gb4", "GB", 4, 66),
    new Note("G4", "G", 4, 67),
    new Note("Ab4", "AB", 4, 68),
    new Note("A4", "A", 4, 69),
    new Note("Bb4", "BB", 4, 70),
    new Note("B4", "B", 4, 71),
    new Note("C5", "C", 5, 72),
    new Note("Db5", "DB", 5, 73),
    new Note("D5", "D", 5, 74),
    new Note("Eb5", "EB", 5, 75),
    new Note("E5", "E", 5, 76),
    new Note("F5", "F", 5, 77),
    new Note("Gb5", "GB", 5, 78),
    new Note("G5", "G", 5, 79),
    new Note("Ab5", "AB", 5, 80),
    new Note("A5", "A", 5, 81),
    new Note("Bb5", "BB", 5, 82),
    new Note("B5", "B", 5, 83),
    new Note("C6", "C", 6, 84),
    new Note("Db6", "DB", 6, 85),
    new Note("D6", "D", 6, 86),
    new Note("Eb6", "EB", 6, 87),
    new Note("E6", "E", 6, 88),
    new Note("F6", "F", 6, 89),
    new Note("Gb6", "GB", 6, 90),
    new Note("G6", "G", 6, 91),
    new Note("Ab6", "AB", 6, 92),
    new Note("A6", "A", 6, 93),
    new Note("Bb6", "BB", 6, 94),
    new Note("B6", "B", 6, 95),
    new Note("C7", "C", 7, 96),
    new Note("Db7", "DB", 7, 97),
    new Note("D7", "D", 7, 98),
    new Note("Eb7", "EB", 7, 99),
    new Note("E7", "E", 7, 100),
    new Note("F7", "F", 7, 101),
    new Note("Gb7", "GB", 7, 102),
    new Note("G7", "G", 7, 103),
    new Note("Ab7", "AB", 7, 104),
    new Note("A7", "A", 7, 105),
    new Note("Bb7", "BB", 7, 106),
    new Note("B7", "B", 7, 107),
    new Note("C8", "C", 8, 108)
  ];

  public static getSubnotes(firstNote: string, lastNote: string): Note[] {
    const firstIndex = this.NOTES.findIndex(note => {
      return note.name === firstNote;
    });
    const lastIndex = this.NOTES.findIndex(note => {
      return note.name === lastNote;
    });
    return this.NOTES.slice(firstIndex, lastIndex + 1);
  }

  public static getNoteByMidi(midi: number): Note {
    return Notes.NOTES.filter(note => {
      return note.midi === midi;
    })[0];
  }

  public static getNoteByName(name: string): Note {
    return Notes.NOTES.filter(note => {
      return note.name === name;
    })[0];
  }
}
