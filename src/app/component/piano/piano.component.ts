import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit
} from "@angular/core";
import { NoteOutputService } from "../../service/note-output.service";
import { Note } from "src/app/data/note";
import { Notes } from "src/app/data/notes";

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
    document.querySelector(".C4").addEventListener(
      "click",
      () => {
        this.jouerNote("C4");
      },
      false
    );
    const range = PIANO_PARAMS.range;
    console.log("subnotes", Notes.getSubnotes(FIRST_NOTE.name, LAST_NOTE.name));
    for (const note of Notes.getSubnotes(FIRST_NOTE.name, LAST_NOTE.name)) {
      if (document.querySelector("." + note.name)) {
        document.querySelector("." + note.name).addEventListener(
          "click",
          () => {
            console.log("toto");
            this.jouerNote(note.name);
          },
          false
        );
      } else {
        console.log("pas glop : ", note.name);
      }
    }
  }

  jouerNote(note: string) {
    this.noteOutputService.jouerNote(note);
  }
}
