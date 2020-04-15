import { AppPage } from "./app.po";
import { browser, logging } from "protractor";
import * as fs from "fs";

// abstract writing screen shot to a file
function writeScreenShot(extension: string, filename: string) {
  const stream = fs.createWriteStream("e2e/data/" + filename);
  stream.write(Buffer.from(extension, "base64"));
  stream.end();
}

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should count right and wrong properly", () => {
    page.navigateTo();
    browser.takeScreenshot().then((png) => {
      writeScreenShot(png, "home.png");
    });
    expect(page.getRight()).toBe(0);
    expect(page.getWrong()).toBe(0);

    page.getPiano().click();
    expect(page.getRightPlusWrong()).toBe(1);

    page.getPiano().click();
    expect(page.getRightPlusWrong()).toBe(2);

    page.getPiano().click();
    expect(page.getRightPlusWrong()).toBe(3);

    page.getPiano().click();
    expect(page.getRightPlusWrong()).toBe(4);

    page.getPiano().click();
    expect(page.getRightPlusWrong()).toBe(5);

    page.getPiano().click();
    expect(page.getRightPlusWrong()).toBe(6);

    page.getPiano().click();
    expect(page.getRightPlusWrong()).toBe(7);

    page.getPiano().click();
    expect(page.getRightPlusWrong()).toBe(8);

    browser.takeScreenshot().then((png) => {
      writeScreenShot(png, "home2.png");
    });
  });

  it("should change first note after 8 tries", () => {
    page.navigateTo();
    browser.takeScreenshot().then((png) => {
      writeScreenShot(png, "home3.png");
    });
    expect(page.getFirstNote()).toBe("vf-auto1006");
    for (let i = 0; i < 8; i++) {
      page.getPiano().click();
    }
    expect(page.getFirstNote()).toBe("vf-auto1100");
    browser.takeScreenshot().then((png) => {
      writeScreenShot(png, "home4.png");
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
