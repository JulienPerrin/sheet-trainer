import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Subject } from "rxjs";
import { NotePlayed } from "src/app/data/note-played";
import { Notes } from "src/app/data/notes";
import { UpDown } from "src/app/data/up-down";
import { NoteInputService } from "src/app/service/note-input.service";
import { NoteOutputService } from "src/app/service/note-output.service";
import { PianoComponent } from "./piano.component";

let playNote: number;
const pianist = new Subject<NotePlayed>();

class MockNoteInputService {
  get pianist() {
    return pianist.asObservable();
  }
}

class MockNoteOutputService {
  playNote(note: string) {
    expect(note).toBe("C4");
    playNote++;
  }
}

describe("PianoComponent", () => {
  let comp: PianoComponent;
  let fixture: ComponentFixture<PianoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PianoComponent,
        { provide: NoteInputService, useClass: MockNoteInputService },
        { provide: NoteOutputService, useClass: MockNoteOutputService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoComponent);
    comp = fixture.componentInstance;
    playNote = 0;
  });

  it("should instanciate component", () => {
    expect(comp).toBeDefined();
  });

  it("should load piano on screen and play C4", () => {
    comp.ngAfterViewInit();

    const c4 = fixture.nativeElement.querySelector(".C4");
    c4.click();

    expect(playNote).toBe(1);
  });

  it("should load piano on screen and activate C4 if C4 is played by the pianist and then desactivate it", () => {
    comp.ngAfterViewInit();

    pianist.next(new NotePlayed(Notes.getNoteByName("C4"), UpDown.DOWN, 127));
    expect(
      fixture.nativeElement.querySelector(".C4").getAttribute("class")
    ).toBe("anchor C4 active");
    pianist.next(new NotePlayed(Notes.getNoteByName("C4"), UpDown.UP, 0));
    expect(
      fixture.nativeElement.querySelector(".C4").getAttribute("class")
    ).toBe("anchor C4");
  });

  it("should throw error if pianist play key with UP/DOWN not set", () => {
    comp.ngAfterViewInit();
    pianist.next(new NotePlayed(Notes.getNoteByName("C4"), null, 127));
  });
});
