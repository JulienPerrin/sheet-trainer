import { Component, OnInit } from "@angular/core";
import { NoteGeneratorService } from "../../service/note-generator.service";

declare const Vex: any;

const NB_NOTES = 8;
const VF = Vex.Flow;
const STAVE_OUTPUT = 10;
const STAVE_WIDTH = 356;
const TREBLE_WIDTH = 50;
const STAVE_HEIGHT = 120;

@Component({
  selector: "app-sheet",
  templateUrl: "./sheet.component.html",
  styleUrls: ["./sheet.component.css"]
})
export class SheetComponent implements OnInit {
  constructor(private noteGeneratorService: NoteGeneratorService) {}

  private context: any;
  public listeNotes: Array<string>;

  ngOnInit(): void {
    // Create an SVG renderer and attach it to the DIV element named "boo".
    const div = document.getElementById("boo");
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    this.context = renderer.getContext();
    renderer.resize(STAVE_WIDTH, STAVE_HEIGHT);
    this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    this.remplirPartition();
  }

  private remplirPartition(): void {
    this.listeNotes = this.noteGeneratorService.generateRandomNoteList(
      NB_NOTES
    );

    this.context.clear();

    // Create a stave at position 10, 0 of width 400 on the canvas.
    const stave = new VF.Stave(STAVE_OUTPUT, 0, STAVE_WIDTH - STAVE_OUTPUT);

    // Add a clef and time signature.
    stave.addClef("treble");

    // Connect it to the rendering context and draw!
    stave.setContext(this.context).draw();

    // Create a voice in 4/4 and add above notes
    const voice = new VF.Voice({
      num_beats: NB_NOTES,
      beat_value: 4
    });
    voice.addTickables(
      this.listeNotes.map(
        note =>
          new VF.StaveNote({
            clef: "treble",
            keys: [note + "/4"],
            duration: "q"
          })
      )
    );

    // Format and justify the notes to 400 pixels.
    const formatter = new VF.Formatter()
      .joinVoices([voice])
      .format([voice], STAVE_WIDTH - TREBLE_WIDTH);

    // Render voice
    voice.draw(this.context, stave);
  }
}
