import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NoteOutputService } from "src/app/service/note-output.service";
import { PianoComponent } from "./piano.component";

let playNote: number;

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
});
