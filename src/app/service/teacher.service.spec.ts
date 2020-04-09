import { Note } from "../data/note";
import { Result } from "../data/result";
import { RightWrong } from "../data/right-wrong";
import { SheetReading } from "../data/sheet-reading";
import { TeacherService } from "./teacher.service";

describe("TeacherService", () => {
  const service: TeacherService = new TeacherService();

  it("random list of 1 note should return a list of 1 note", () => {
    const notes: Array<Note> = service.generateRandomNoteList(1);
    expect(notes.length).toBe(1);
    expect(notes[0]).toBeDefined();
  });

  it("should generate list of 0 notes", () => {
    const notes: Array<Note> = service.generateRandomNoteList(0);
    expect(notes.length).toBe(0);
  });

  it("should validate note and advance", (done: DoneFn) => {
    const notes = service.generateRandomNoteList(2);
    const sub = service.teacher.subscribe((result: Result) => {
      expect(result.played.name).toBe(notes[0].name);
      expect(result.expected.name).toBe(notes[0].name);
      expect(result.rightWrong).toBe(RightWrong.RIGHT);
      expect(result.sheetReading).toBe(SheetReading.ADVANCE);
      done();
    });
    service.checkIfRightNote(notes[0]);
    sub.unsubscribe();
  });

  it("should validate note when right and advance even if it should not advance if wrong", (done: DoneFn) => {
    const notes = service.generateRandomNoteList(2);
    const sub = service.teacher.subscribe((result: Result) => {
      expect(result.played.name).toBe(notes[0].name);
      expect(result.expected.name).toBe(notes[0].name);
      expect(result.rightWrong).toBe(RightWrong.RIGHT);
      expect(result.sheetReading).toBe(SheetReading.ADVANCE);
      done();
    });
    service.checkIfRightNoteAndAdvance(notes[0], false);
    sub.unsubscribe();
  });

  it("should refuse note and advance", (done: DoneFn) => {
    const notes = service.generateRandomNoteList(2);
    const sub = service.teacher.subscribe((result: Result) => {
      expect(result.played.name).toBe("unknown");
      expect(result.expected.name).toBe(notes[0].name);
      expect(result.rightWrong).toBe(RightWrong.WRONG);
      expect(result.sheetReading).toBe(SheetReading.ADVANCE);
      done();
    });
    service.checkIfRightNote(new Note("unknown", "unknown", -1, -1));
    sub.unsubscribe();
  });

  it("should refuse note and stay", (done: DoneFn) => {
    const notes = service.generateRandomNoteList(2);
    const sub = service.teacher.subscribe((result: Result) => {
      expect(result.played.name).toBe("unknown");
      expect(result.expected.name).toBe(notes[0].name);
      expect(result.rightWrong).toBe(RightWrong.WRONG);
      expect(result.sheetReading).toBe(SheetReading.STAY);
      done();
    });
    service.checkIfRightNoteAndAdvance(
      new Note("unknown", "unknown", -1, -1),
      false
    );
    sub.unsubscribe();
  });
});
