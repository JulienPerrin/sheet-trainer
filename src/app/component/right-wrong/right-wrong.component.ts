import { Component, OnInit, Input } from "@angular/core";
import { Result } from "src/app/data/result";
import { NoteGeneratorService } from "src/app/service/note-generator.service";

declare const MIDI: any;

@Component({
  selector: "app-right-wrong",
  templateUrl: "./right-wrong.component.html",
  styleUrls: ["./right-wrong.component.css"]
})
export class RightWrongComponent implements OnInit {
  constructor(private noteGeneratorService: NoteGeneratorService) {}

  right: number;
  wrong: number;

  ngOnInit(): void {
    this.right = 0;
    this.wrong = 0;
    this.noteGeneratorService.resultEmitter.subscribe((result: Result) => {
      switch (result) {
        case Result.RIGHT:
          this.right++;
          break;
        case Result.WRONG:
          this.wrong++;
          break;
      }
    });
  }
}
