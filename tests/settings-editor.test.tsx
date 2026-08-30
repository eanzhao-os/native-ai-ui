import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import SettingsEditor from "@/components/settings-editor";

const FIRST_DRAFT = '{\n  "theme": "dark"\n}';
const CONFLICT_DRAFT = '{\n  "theme": "dark",\n  "maxTokens": 12288\n}';
const REMOTE_DRAFT = JSON.stringify(
  {
    defaultRoute: "deepseek/reasoner",
    temperature: 0.4,
    maxTokens: 8192,
  },
  null,
  2,
);

afterEach(() => {
  vi.useRealTimers();
});

describe("SettingsEditor", () => {
  test("mounts deterministic conflict and refetched visual cases", () => {
    const conflictView = render(<SettingsEditor visualCase="conflict" />);
    const conflictEditor = screen.getByLabelText("Settings JSON") as HTMLTextAreaElement;
    expect(screen.getByText("SETTINGS_CONFLICT")).not.toBeNull();
    expect(conflictEditor.value).toBe(CONFLICT_DRAFT);
    expect(screen.getByText("revision 8")).not.toBeNull();

    conflictView.unmount();
    render(<SettingsEditor visualCase="refetched" />);
    const refetchedEditor = screen.getByLabelText("Settings JSON") as HTMLTextAreaElement;
    expect(screen.queryByText("SETTINGS_CONFLICT")).toBeNull();
    expect(refetchedEditor.value).toBe(REMOTE_DRAFT);
    expect(screen.getByText("revision 9")).not.toBeNull();
  });

  test("saves the current editable draft against the pinned revision", async () => {
    vi.useFakeTimers();
    render(<SettingsEditor />);

    const editor = () =>
      screen.getByLabelText("Settings JSON") as HTMLTextAreaElement;
    fireEvent.change(editor(), { target: { value: FIRST_DRAFT } });
    fireEvent.click(screen.getByRole("button", { name: "Save revision" }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(650);
    });

    expect(editor().value).toBe(FIRST_DRAFT);
    expect(screen.getByText("Saved revision 8")).not.toBeNull();
    expect(screen.getByText("revision 8")).not.toBeNull();
  });

  test("keeps the interactive textarea stable through save, conflict, and refetch", async () => {
    vi.useFakeTimers();
    render(<SettingsEditor />);

    const editor = screen.getByLabelText("Settings JSON") as HTMLTextAreaElement;
    fireEvent.change(editor, { target: { value: FIRST_DRAFT } });
    editor.focus();
    editor.setSelectionRange(5, 12);
    editor.scrollTop = 36;

    fireEvent.click(screen.getByRole("button", { name: "Save revision" }));
    expect(screen.getByLabelText("Settings JSON")).toBe(editor);
    expect(document.activeElement).toBe(editor);
    expect([editor.selectionStart, editor.selectionEnd, editor.scrollTop]).toEqual([
      5,
      12,
      36,
    ]);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(650);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500);
    });
    expect(screen.getByLabelText("Settings JSON")).toBe(editor);
    expect(document.activeElement).toBe(editor);
    expect([editor.selectionStart, editor.selectionEnd, editor.scrollTop]).toEqual([
      5,
      12,
      36,
    ]);

    fireEvent.change(editor, { target: { value: CONFLICT_DRAFT } });
    editor.setSelectionRange(8, 18);
    editor.scrollTop = 48;
    fireEvent.click(screen.getByRole("button", { name: "Save revision" }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(650);
    });

    expect(screen.getByText("SETTINGS_CONFLICT")).not.toBeNull();
    expect(screen.getByLabelText("Settings JSON")).toBe(editor);
    expect(document.activeElement).toBe(editor);
    expect([editor.selectionStart, editor.selectionEnd, editor.scrollTop]).toEqual([
      8,
      18,
      48,
    ]);

    fireEvent.click(
      screen.getByRole("button", { name: "Discard changes and refetch" }),
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(900);
    });

    expect(screen.getByLabelText("Settings JSON")).toBe(editor);
    expect(document.activeElement).toBe(editor);
    expect(editor.value).toBe(REMOTE_DRAFT);
  });

  test("preserves a conflicting draft until explicit discard and refetch", async () => {
    vi.useFakeTimers();
    render(<SettingsEditor />);

    const editor = () =>
      screen.getByLabelText("Settings JSON") as HTMLTextAreaElement;
    fireEvent.change(editor(), { target: { value: FIRST_DRAFT } });
    fireEvent.click(screen.getByRole("button", { name: "Save revision" }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(650);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500);
    });

    fireEvent.change(editor(), { target: { value: CONFLICT_DRAFT } });
    fireEvent.click(screen.getByRole("button", { name: "Save revision" }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(650);
    });

    expect(screen.getByText("SETTINGS_CONFLICT")).not.toBeNull();
    expect(editor().value).toBe(CONFLICT_DRAFT);
    expect(screen.getByText("revision 8")).not.toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: "Discard changes and refetch" }),
    );
    expect(editor().value).toBe(CONFLICT_DRAFT);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(900);
    });

    expect(editor().value).toBe(REMOTE_DRAFT);
    expect(screen.getByText("revision 9")).not.toBeNull();
    expect(screen.queryByText("SETTINGS_CONFLICT")).toBeNull();
  });
});
