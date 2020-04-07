import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Note } from "../data/note";
import { Notes } from "../data/notes";
import { Result } from "../data/result";
import { RightWrong } from "../data/right-wrong";
import { SheetReading } from "../data/sheet-reading";

const ADVANCE_IF_WRONG = true;
const NOTES_AUTORISED = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];

@Injectable({
  providedIn: "root",
})
export class TeacherService {
  constructor() {
    this.noteList = [];
    this.currentNoteNumber = 0;
  }

  private currentNoteNumber: number;
  private noteList: Array<Note>;

  private _teacher = new Subject<Result>();

  public get teacher(): Observable<Result> {
    return this._teacher.asObservable();
  }

  public generateRandomNoteList(size: number): Array<Note> {
    this.currentNoteNumber = 0;
    this.noteList = [];
    for (let i = 0; i < size; i++) {
      this.noteList.push(this.randomNote());
    }
    return [...this.noteList];
  }

  private randomNote(): Note {
    return Notes.getNoteByName(
      NOTES_AUTORISED[Math.floor(Math.random() * NOTES_AUTORISED.length)]
    );
  }

  public checkIfRightNote(note: Note): void {
    this.checkIfRightNoteAndAdvance(note, ADVANCE_IF_WRONG);
  }

  public checkIfRightNoteAndAdvance(note: Note, advanceIfWrong: boolean): void {
    const res: boolean = this.noteList[this.currentNoteNumber] === note;
    const currentNote = this.noteList[this.currentNoteNumber];
    let sheetStatus = SheetReading.STAY;
    if (res || advanceIfWrong) {
      sheetStatus = this.advance();
    }
    this._teacher.next(
      new Result(
        res ? RightWrong.RIGHT : RightWrong.WRONG,
        currentNote,
        note,
        sheetStatus
      )
    );
  }

  private advance(): SheetReading {
    const size = this.noteList.length;
    if (size === 0) {
      throw new Error("Note list has never been defined. ");
    }
    if (this.currentNoteNumber >= size - 1) {
      this.generateRandomNoteList(size);
      return SheetReading.END_SHEET;
    } else {
      this.currentNoteNumber++;
      return SheetReading.ADVANCE;
    }
  }
}
