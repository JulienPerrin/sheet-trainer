import { Note } from "./note";

export class NoteHeard {
  constructor(public readonly note: Note) {
    this.note = note;
  }
}
