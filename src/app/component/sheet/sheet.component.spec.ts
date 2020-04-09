import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SheetComponent } from "./sheet.component";
import { Notes } from "src/app/data/notes";

describe("SheetComponent", () => {
  let comp: SheetComponent;
  let fixture: ComponentFixture<SheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SheetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetComponent);
    comp = fixture.componentInstance;
    comp.ngOnInit();
  });

  it("should load partition", () => {
    comp.listeNotes = [Notes.getNoteByName("C4")];
    const noteOnPartition = fixture.nativeElement.querySelector(
      ".vf-stavenote"
    );
    expect(!!noteOnPartition).toBeTrue();
  });
});
