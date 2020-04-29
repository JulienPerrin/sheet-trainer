import {
  AfterViewInit,
  Component,
  OnInit,
  ApplicationRef,
} from "@angular/core";
import { combineLatest, Subject, ReplaySubject } from "rxjs";
import { Note } from "./data/note";
import { SheetReading } from "./data/sheet-reading";
import { SpeakersReady } from "./data/speakers-ready";
import { TeacherService } from "./service/teacher.service";
import { NoteInputService } from "./service/note-input.service";
import { NoteOutputService } from "./service/note-output.service";
import { NotePlayed } from "./data/note-played";
import { Result } from "./data/result";
import { NoteHeard } from "./data/note-heard";
import { AppComponent } from "./app.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Notes } from "./data/notes";
import { UpDown } from "./data/up-down";

const pianistSubject = new Subject<NotePlayed>();
const pianoPreparatorSubject = new ReplaySubject<SpeakersReady>(1);
const spectatorSubject = new Subject<NoteHeard>();
const teacherSubject = new Subject<Result>();

let right = 0;
let wrong = 0;

class MockNoteInputService {
  loadMidiDevice() {
    return pianistSubject.asObservable();
  }
}
class MockNoteOutputService {
  loadPianoSound() {
    return pianoPreparatorSubject.asObservable();
  }
  get spectator() {
    return spectatorSubject.asObservable();
  }
  outputNoteEvent(notePlayed: NotePlayed) {
    expect(notePlayed.upDown).toBe(UpDown.DOWN);
    spectatorSubject.next(new NoteHeard(notePlayed.note));
  }
}
class MockTeacherService {
  get teacher() {
    return teacherSubject.asObservable();
  }
  checkIfRightNote(note: Note) {
    "C4" === note.name ? right++ : wrong++;
  }
  generateRandomNoteList(nb: number) {
    const res: Note[] = [];
    for (let i = 0; i < nb; i++) {
      res.push(Notes.getNoteByName("C4"));
    }
    return res;
  }
}
class MockApplicationRef {
  tick() {
    console.log("ApplicationRef.tick() called");
  }
}

describe("AppComponent", () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        { provide: NoteInputService, useClass: MockNoteInputService },
        { provide: NoteOutputService, useClass: MockNoteOutputService },
        { provide: TeacherService, useClass: MockTeacherService },
        { provide: ApplicationRef, useClass: MockApplicationRef },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    comp.ngOnInit();
    comp.ngAfterViewInit();
    right = 0;
    wrong = 0;
  });

  it("should listen to notes once device is loaded and check that the note is the right one", () => {
    pianoPreparatorSubject.next(new SpeakersReady("grand piano"));
    pianistSubject.next(
      new NotePlayed(Notes.getNoteByName("C4"), UpDown.DOWN, 127)
    );
    expect(right).toBe(1);
    expect(wrong).toBe(0);
  });

  it("should listen to notes once device is loaded and check that the note is the wrong one", () => {
    pianoPreparatorSubject.next(new SpeakersReady("grand piano"));
    pianistSubject.next(
      new NotePlayed(Notes.getNoteByName("C5"), UpDown.DOWN, 127)
    );
    expect(right).toBe(0);
    expect(wrong).toBe(1);
  });

  it("should load list of notes", () => {
    expect(comp.listeNotes).toBeDefined();
    expect(comp.listeNotes.length).toBe(8);
  });

  it("should generate new list of notes at the end of the sheet", () => {
    comp.listeNotes = [];
    expect(comp.listeNotes).toBeDefined();
    expect(comp.listeNotes.length).toBe(0);
    teacherSubject.next(new Result(null, null, null, SheetReading.END_SHEET));
    expect(comp.listeNotes).toBeDefined();
    expect(comp.listeNotes.length).toBe(8);
  });
});
