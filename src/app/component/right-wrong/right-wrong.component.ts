import { Component, OnInit } from "@angular/core";

declare const MIDI: any;

@Component({
  selector: "app-right-wrong",
  templateUrl: "./right-wrong.component.html",
  styleUrls: ["./right-wrong.component.css"]
})
export class RightWrongComponent implements OnInit {
  constructor() {}

  public right: number;
  public wrong: number;

  ngOnInit(): void {
    this.right = 0;
    this.wrong = 0;
  }
}
