import { Component, Input, OnInit } from "@angular/core";
import { Note } from "src/app/data/note";

declare const Vex: any;

const VF = Vex.Flow;
const STAVE_OUTPUT = 10;
const STAVE_WIDTH = 656;
const TREBLE_WIDTH = 50;
const STAVE_HEIGHT = 240;

@Component({
  selector: "app-sheet",
  templateUrl: "./sheet.component.html",
  styleUrls: ["./sheet.component.css"],
})
export class SheetComponent implements OnInit {
  constructor() {}

  private context: any;
  private _listeNotes: Array<Note>;

  ngOnInit(): void {
    // Create an SVG renderer and attach it to the DIV element named "boo".
    const div = document.getElementById("boo");
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    this.context = renderer.getContext();
    renderer.resize(STAVE_WIDTH, STAVE_HEIGHT);
    this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
  }

  get listeNotes(): Array<Note> {
    return this._listeNotes;
  }

  @Input() set listeNotes(listeNotes: Array<Note>) {
    if (listeNotes.length > 0) {
      console.log(listeNotes);
      this._listeNotes = listeNotes;

      this.context.clear();

      const staveTreble = this.generateStave("treble");
      const voiceTreble = this.generateVoice("treble", listeNotes);

      //const staveBass = this.generateStave("bass");
      //const voiceBass = this.generateVoice("bass", []);

      // Format and justify the notes to 400 pixels.
      new VF.Formatter()
        .joinVoices([voiceTreble])
        //.joinVoices([voiceBass])
        .format([
          voiceTreble,
          //voiceBass
        ], STAVE_WIDTH - TREBLE_WIDTH);

      // Render voice
      voiceTreble.draw(this.context, staveTreble);
      //voiceBass.draw(this.context, staveBass);
    }
  }

  private generateStave(clef: string): any {
      // Create a stave at position 10, 0 of width 400 on the canvas.
      const stave = new VF.Stave(
        STAVE_OUTPUT,
        clef === "bass" ? 90 : 0,
        STAVE_WIDTH - STAVE_OUTPUT
      );

      // Add a clef and time signature.
      stave.addClef(clef);

      // Connect it to the rendering context and draw!
      stave.setContext(this.context).draw();

      return stave;
  }

  private generateVoice(clef: string, listeNotes: Array<Note>): any {
      // Create a voice in 4/4 and add above notes
      const voice = new VF.Voice({
        num_beats: listeNotes.length,
        beat_value: 4,
      });
      voice.addTickables(
        listeNotes.map(
          (note) =>
            new VF.StaveNote({
              clef,
              keys: [note.vexFlowName + "/" + (note.vexFlowOctave - (clef === "bass" ? 2 : 0))],
              duration: "q",
            })
        )
      );
      return voice;
  }

}
