import { Component, OnInit, OnChanges, AfterViewInit } from "@angular/core";
import { from } from "rxjs";
import { first, map } from "rxjs/operators";
import { NoteOutputService } from "../note.output.service";

@Component({
  selector: "app-piano",
  templateUrl: "./piano.component.html",
  styleUrls: ["./piano.component.css"],
  providers: [NoteOutputService]
})
export class PianoComponent implements OnInit {
  constructor(public noteOutputService: NoteOutputService) {}

  ngOnInit(): void {}

  jouerNote(note: string) {
    this.noteOutputService.jouerNote(note);
  }
}
