import { Note } from "./note";
import { Result } from "./result";

export class NotePlayed {
  constructor(public note: Note, public result: Result) {
    this.note = note;
    this.result = result;
  }
}
