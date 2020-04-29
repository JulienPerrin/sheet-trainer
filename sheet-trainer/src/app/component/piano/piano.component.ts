import { AfterViewInit, Component } from "@angular/core";
import { NotePlayed } from "src/app/data/note-played";
import { Notes } from "src/app/data/notes";
import { UpDown } from "src/app/data/up-down";
import { NoteInputService } from "src/app/service/note-input.service";
import { NoteOutputService } from "../../service/note-output.service";

declare const piano: any;

const FIRST_NOTE = Notes.getNoteByName("A2");
const LAST_NOTE = Notes.getNoteByName("C6");
const PIANO_PARAMS = {
  range: {
    startOctave: FIRST_NOTE.vexFlowOctave,
    startKey: FIRST_NOTE.name[0],
    endOctave: LAST_NOTE.vexFlowOctave,
    endKey: LAST_NOTE.name[0],
  },
  lang: "en",
  notation: "scientific", // useful if we want to add notation one day
  namesMode: "sharp",
};

@Component({
  selector: "app-piano",
  templateUrl: "./piano.component.html",
  styleUrls: ["./piano.component.css"],
})
export class PianoComponent implements AfterViewInit {
  constructor(
    public noteInputService: NoteInputService,
    public noteOutputService: NoteOutputService
  ) {}

  ngAfterViewInit(): void {
    piano(document.getElementById("piano"), PIANO_PARAMS);
    document.getElementById("piano").classList.add("piano-show-names");
    for (const note of Notes.getSubnotes(FIRST_NOTE.name, LAST_NOTE.name)) {
      const key = document.querySelector(`.${note.name}`);
      key.addEventListener(
        "click",
        () => {
          this.noteOutputService.playNote(note.name);
        },
        false
      );
    }
    this.noteInputService.pianist.subscribe((notePlayed: NotePlayed) => {
      switch (notePlayed.upDown) {
        case UpDown.DOWN:
          document
            .querySelector(`.${notePlayed.note.name}`)
            .classList.add("active");
          break;
        case UpDown.UP:
          document
            .querySelector(`.${notePlayed.note.name}`)
            .classList.remove("active");
          break;
        default:
          throw new Error("not supposed to happen, never UP or DOWN");
      }
    });
  }
}
