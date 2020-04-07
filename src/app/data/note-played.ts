import { Note } from "./note";
import { UpDown } from "./up-down";

export class NotePlayed {
  constructor(
    public readonly note: Note,
    public readonly upDown: UpDown,
    /** a value between 0 and 127 */
    public readonly velocity: number
  ) {
    this.note = note;
    this.upDown = upDown;
    this.velocity = velocity;
  }
}
