import { browser, by, element, ElementFinder } from "protractor";

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getPiano(): ElementFinder {
    return element(by.className("C4"));
  }

  getRight(): Promise<number> {
    return element(by.css("#right"))
      .getText()
      .then((x) => +x) as Promise<number>;
  }

  getWrong(): Promise<number> {
    return element(by.css("#wrong"))
      .getText()
      .then((x) => +x) as Promise<number>;
  }

  getRightPlusWrong(): Promise<number> {
    return this.getRight().then((x) => this.getWrong().then((y) => x + y));
  }

  getFirstNote(): Promise<string> {
    return element(by.className("vf-stavenote")).getAttribute("id") as Promise<
      string
    >;
  }
}
