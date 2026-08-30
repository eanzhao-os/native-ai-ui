import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AuthorizationSurface from "@/components/authorization-surface";

describe("AuthorizationSurface", () => {
  test("mounts the deterministic provider-switched visual case", () => {
    render(<AuthorizationSurface visualCase="provider-switched" />);

    const secret = screen.getByLabelText("Access token") as HTMLInputElement;
    expect(screen.getByText("Authorize e2b")).not.toBeNull();
    expect(secret.value).toBe("");
    expect(secret.type).toBe("password");
  });

  test("switching providers starts one clean masked credential flow", () => {
    render(<AuthorizationSurface />);

    fireEvent.click(
      screen.getByRole("button", { name: "Sign in to deepseek" }),
    );
    const deepseekSecret = screen.getByLabelText("Access token") as HTMLInputElement;
    fireEvent.change(deepseekSecret, { target: { value: "dsk-old-secret" } });
    fireEvent.click(screen.getByRole("button", { name: "Reveal token" }));
    expect(deepseekSecret.type).toBe("text");
    deepseekSecret.focus();

    fireEvent.click(screen.getByRole("button", { name: "Sign in to e2b" }));

    const e2bSecret = screen.getByLabelText("Access token") as HTMLInputElement;
    expect(screen.getByText("Authorize e2b")).not.toBeNull();
    expect(e2bSecret).toBe(deepseekSecret);
    expect(document.activeElement).toBe(e2bSecret);
    expect(e2bSecret.value).toBe("");
    expect(e2bSecret.type).toBe("password");
  });

  test("withdrawing clears the secret and restores masking before the next flow", () => {
    render(<AuthorizationSurface />);

    fireEvent.click(screen.getByRole("button", { name: "Sign in to e2b" }));
    const secret = screen.getByLabelText("Access token") as HTMLInputElement;
    fireEvent.change(secret, { target: { value: "e2b-secret" } });
    fireEvent.click(screen.getByRole("button", { name: "Reveal token" }));
    expect(secret.type).toBe("text");

    fireEvent.click(screen.getByRole("button", { name: "Withdraw" }));
    expect(screen.queryByLabelText("Access token")).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: "Sign in to deepseek" }),
    );
    const nextSecret = screen.getByLabelText("Access token") as HTMLInputElement;
    expect(nextSecret.value).toBe("");
    expect(nextSecret.type).toBe("password");
  });
});
