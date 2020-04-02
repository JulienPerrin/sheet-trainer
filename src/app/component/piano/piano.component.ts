import { AfterViewInit, Component } from "@angular/core";
import { Notes } from "src/app/data/notes";
import { NoteOutputService } from "../../service/note-output.service";

declare const piano: any;

const FIRST_NOTE = Notes.getNoteByName("C4");
const LAST_NOTE = Notes.getNoteByName("B4");
const PIANO_PARAMS = {
  range: {
    startOctave: FIRST_NOTE.vexFlowOctave,
    startKey: FIRST_NOTE.name[0],
    endOctave: LAST_NOTE.vexFlowOctave,
    endKey: LAST_NOTE.name[0]
  },
  lang: "en",
  notation: "scientific", // useful if we want to add notation one day
  namesMode: "sharp"
};

@Component({
  selector: "app-piano",
  templateUrl: "./piano.component.html",
  styleUrls: ["./piano.component.css"]
})
export class PianoComponent implements AfterViewInit {
  constructor(public noteOutputService: NoteOutputService) {}

  ngAfterViewInit(): void {
    piano(document.getElementById("piano"), PIANO_PARAMS);
    for (const note of Notes.getSubnotes(FIRST_NOTE.name, LAST_NOTE.name)) {
      if (document.querySelector("." + note.name)) {
        document.querySelector("." + note.name).addEventListener(
          "click",
          () => {
            this.jouerNote(note.name);
          },
          false
        );
      } else {
        console.log(
          "Not good, a note in the piano on screen is unknown : ",
          note.name
        );
      }
    }
  }

  jouerNote(note: string) {
    this.noteOutputService.jouerNote(note);
  }
}
