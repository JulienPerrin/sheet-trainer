import { Injectable } from "@angular/core";

const ADVANCE_IF_WRONG = true;

@Injectable({
  providedIn: "root"
})
export class NoteGeneratorService {
  constructor() {
    this.noteList = [];
    this.currentNoteNumber = 0;
  }

  private currentNoteNumber: number;
  private noteList: Array<string>;

  private randomNote(): string {
    return "C";
  }

  private advance(): void {
    const size = this.noteList.length;
    if (size === 0) {
      throw new Error("Note list has never been defined. ");
    }
    if (this.currentNoteNumber >= size) {
      this.generateRandomNoteList(size);
    } else {
      this.currentNoteNumber++;
    }
  }

  public generateRandomNoteList(size: number): Array<string> {
    this.currentNoteNumber = 0;
    this.noteList = [];
    for (let i = 0; i < size; i++) {
      this.noteList.push(this.randomNote());
    }
    return this.noteList;
  }

  public checkIfRightNote(note: string): boolean {
    return this.checkIfRightNoteAndAdvance(note, ADVANCE_IF_WRONG);
  }

  public checkIfRightNoteAndAdvance(
    note: string,
    advanceIfWrong: boolean
  ): boolean {
    const res: boolean = this.noteList[this.currentNoteNumber] === note;
    if (res || advanceIfWrong) {
      this.advance();
    }
    // TODO : appeler right wrong pour lui dire le résultat
    return res;
  }
}
