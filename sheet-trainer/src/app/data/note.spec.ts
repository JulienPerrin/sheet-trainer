import { Note } from "./note";
import { Notes } from "./notes";

describe("Note", () => {
  it("should output note to string", () => {
    expect(new Note("C4", "C", 8, 60).tostring()).toBe(
      "Note(name : C4, midi : 60)"
    );
  });
});
