import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Note } from "./data/note";
import { SheetReading } from "./data/sheet-reading";
import { NoteGeneratorService } from "./service/note-generator.service";
import { NoteInputService } from "./service/note-input.service";
import { NoteOutputService } from "./service/note-output.service";

export const NB_NOTES = 8;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: []
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private noteInputService: NoteInputService,
    private noteOutputService: NoteOutputService,
    private noteGeneratorService: NoteGeneratorService
  ) {}

  title = "sheet-trainer";
  listeNotes: Array<Note> = [];

  ngOnInit(): void {
    this.noteOutputService.loadPianoSound(() =>
      this.noteInputService.loadMidiDevice(
        this.noteOutputService.outputMIDIMessage
      )
    );
  }

  ngAfterViewInit(): void {
    this.generateNotes();
    this.noteGeneratorService.sheetReadingtEmitter.subscribe(
      (sheetReading: SheetReading) => {
        switch (sheetReading) {
          case SheetReading.END_SHEET:
            console.log("end sheet");
            this.generateNotes();
        }
      }
    );
  }

  private generateNotes() {
    this.listeNotes = this.noteGeneratorService.generateRandomNoteList(
      NB_NOTES
    );
  }
}
