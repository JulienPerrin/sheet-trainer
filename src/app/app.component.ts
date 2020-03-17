import {
  Component,
  AfterViewInit,
  AfterViewChecked,
  OnInit
} from "@angular/core";
import { NoteInputService } from "./note.input.service";
import { NoteOutputService } from "./note.output.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: []
})
export class AppComponent implements OnInit {
  constructor(
    public noteInputService: NoteInputService,
    public noteOutputService: NoteOutputService
  ) {}

  title = "sheet-trainer";

  ngOnInit(): void {
    this.noteOutputService.loadPianoSound(() =>
      this.noteInputService.loadMidiDevice(
        this.noteOutputService.outputMIDIMessage
      )
    );
  }

  successJouerNote() {
    this.noteOutputService.jouerNote("C4");
  }
}
