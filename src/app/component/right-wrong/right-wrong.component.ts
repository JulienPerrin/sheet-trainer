import { Component, OnInit, ApplicationRef } from "@angular/core";
import { RightWrong } from "src/app/data/right-wrong";
import { TeacherService } from "src/app/service/teacher.service";
import { Result } from "src/app/data/result";

@Component({
  selector: "app-right-wrong",
  templateUrl: "./right-wrong.component.html",
  styleUrls: ["./right-wrong.component.css"],
})
export class RightWrongComponent implements OnInit {
  constructor(
    private teacherService: TeacherService,
    private rf: ApplicationRef
  ) {}

  right: number;
  wrong: number;

  ngOnInit(): void {
    this.right = 0;
    this.wrong = 0;
    this.teacherService.teacher.subscribe((result: Result) => {
      switch (result.rightWrong) {
        case RightWrong.RIGHT:
          this.right++;
          break;
        case RightWrong.WRONG:
          this.wrong++;
          break;
      }
      this.rf.tick();
    });
  }
}
