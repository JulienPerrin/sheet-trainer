import { EventEmitter, Injectable } from "@angular/core";
import { Note } from "../data/note";
import { Notes } from "../data/notes";
import { Result } from "../data/result";
import { SheetReading } from "../data/sheet-reading";

const ADVANCE_IF_WRONG = true;
const NOTES_AUTORISED = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

@Injectable({
  providedIn: "root"
})
export class NoteGeneratorService {
  constructor() {
    this.noteList = [];
    this.currentNoteNumber = 0;
  }

  private currentNoteNumber: number;
  private noteList: Array<Note>;

  resultEmitter = new EventEmitter<Result>();
  sheetReadingtEmitter = new EventEmitter<SheetReading>();

  public generateRandomNoteList(size: number): Array<Note> {
    this.currentNoteNumber = 0;
    this.noteList = [];
    for (let i = 0; i < size; i++) {
      this.noteList.push(this.randomNote());
    }
    return this.noteList;
  }

  public checkIfRightNote(note: Note): boolean {
    return this.checkIfRightNoteAndAdvance(note, ADVANCE_IF_WRONG);
  }

  public checkIfRightNoteAndAdvance(
    note: Note,
    advanceIfWrong: boolean
  ): boolean {
    const res: boolean = this.noteList[this.currentNoteNumber] === note;
    if (res || advanceIfWrong) {
      this.advance();
    } else {
      this.sheetReadingtEmitter.emit(SheetReading.STAY);
    }
    this.resultEmitter.emit(res ? Result.RIGHT : Result.WRONG);
    return res;
  }

  private advance(): void {
    const size = this.noteList.length;
    if (size === 0) {
      throw new Error("Note list has never been defined. ");
    }
    if (this.currentNoteNumber >= size - 1) {
      this.sheetReadingtEmitter.emit(SheetReading.END_SHEET);
      this.generateRandomNoteList(size);
    } else {
      this.sheetReadingtEmitter.emit(SheetReading.ADVANCE);
      this.currentNoteNumber++;
    }
  }

  private randomNote(): Note {
    return Notes.getNoteByName(
      NOTES_AUTORISED[Math.floor(Math.random() * NOTES_AUTORISED.length)]
    );
  }
}
