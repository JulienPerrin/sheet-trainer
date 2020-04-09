import { Note } from "./note";
import { Notes } from "./notes";

describe("Notes", () => {
  it("should get note by name", () => {
    expect(Notes.getNoteByName("C4").name).toBe("C4");
  });
  it("should get note by midi", () => {
    expect(Notes.getNoteByMidi(60).name).toBe("C4");
  });
  it("should get the list of notes from C4 to B4", () => {
    const subList: Note[] = Notes.getSubnotes("C4", "B4");
    expect(subList.length).toBe(12);
    expect(subList[0].name).toBe("C4");
    expect(subList[1].name).toBe("Db4");
    expect(subList[2].name).toBe("D4");
    expect(subList[3].name).toBe("Eb4");
    expect(subList[4].name).toBe("E4");
    expect(subList[5].name).toBe("F4");
    expect(subList[6].name).toBe("Gb4");
    expect(subList[7].name).toBe("G4");
    expect(subList[8].name).toBe("Ab4");
    expect(subList[9].name).toBe("A4");
    expect(subList[10].name).toBe("Bb4");
    expect(subList[11].name).toBe("B4");
  });
  it("should have all the notes", () => {
    expect(Notes.NOTES.length).toBe(88);
  });
});
