import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LangProvider, useLangContext } from "@/lib/lang-context";

function LanguageControl() {
  const { setGlobalLang } = useLangContext();
  return <button onClick={() => setGlobalLang("zh")}>Use Chinese</button>;
}

afterEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = "";
});

describe("LangProvider", () => {
  test("synchronizes the document language", () => {
    document.documentElement.lang = "en";
    render(
      <LangProvider>
        <LanguageControl />
      </LangProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Use Chinese" }));

    expect(document.documentElement.lang).toBe("zh");
  });
});
