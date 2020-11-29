import { ApplicationRef } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Subject } from "rxjs";
import { Result } from "src/app/data/result";
import { RightWrong } from "src/app/data/right-wrong";
import { TeacherService } from "src/app/service/teacher.service";
import { RightWrongComponent } from "./right-wrong.component";

const teacherSubject = new Subject<Result>();

class MockTeacherService {
  get teacher() {
    return teacherSubject.asObservable();
  }
}

class MockApplicationRef {
  tick() {
    console.log("ApplicationRef.tick() called");
  }
}

describe("RightWrongComponent", () => {
  let comp: RightWrongComponent;
  let fixture: ComponentFixture<RightWrongComponent>;
  let right: HTMLElement;
  let wrong: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        RightWrongComponent,
        { provide: TeacherService, useClass: MockTeacherService },
        { provide: ApplicationRef, useClass: MockApplicationRef },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightWrongComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    right = fixture.nativeElement.querySelector("#right");
    wrong = fixture.nativeElement.querySelector("#wrong");
  });

  it("should create", () => {
    expect(comp).toBeDefined();
  });

  it("should increase right", (): void => {
    expect(right.textContent).toBe("0");
    expect(wrong.textContent).toBe("0");
    teacherSubject.next(new Result(RightWrong.RIGHT, null, null, null));
    fixture.detectChanges();
    expect(right.textContent).toBe("1");
    expect(wrong.textContent).toBe("0");
  });

  it("should increase wrong", (): void => {
    expect(right.textContent).toBe("0");
    expect(wrong.textContent).toBe("0");
    teacherSubject.next(new Result(RightWrong.WRONG, null, null, null));
    fixture.detectChanges();
    expect(right.textContent).toBe("0");
    expect(wrong.textContent).toBe("1");
  });
});
