import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { SheetComponent } from "./sheet.component";
import { Notes } from "src/app/data/notes";

describe("SheetComponent", () => {
  let comp: SheetComponent;
  let fixture: ComponentFixture<SheetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [SheetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetComponent);
    comp = fixture.componentInstance;
    comp.ngOnInit();
  });

  it("should load partition and be resilient", () => {
    comp.listeNotes = [Notes.getNoteByName("C4")];
    expect(comp.listeNotes.length).toBe(1);
    const noteOnPartition = fixture.nativeElement.querySelector(
      ".vf-stavenote"
    );
    expect(!!noteOnPartition).toBeTrue();
    comp.listeNotes = [];
    expect(!!noteOnPartition).toBeTrue();
  });
});
