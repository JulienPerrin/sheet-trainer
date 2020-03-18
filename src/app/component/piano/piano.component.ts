import { Component, OnInit } from "@angular/core";
import { NoteOutputService } from "../../service/note-output.service";

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
