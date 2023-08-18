import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

describe("Home", () => {
  it("renders a heading", () => {
    render(<RootLayout>Tabnews Clone</RootLayout>);

    const heading = screen.getByText(/Tabnews Clone/i);

    expect(heading).toBeInTheDocument();
  });
});
