import { Note } from "./note";
import { RightWrong } from "./right-wrong";
import { SheetReading } from "./sheet-reading";

export class Result {
  constructor(
    public readonly rightWrong: RightWrong,
    public readonly expected: Note,
    public readonly played: Note,
    public readonly sheetReading: SheetReading
  ) {}
}
