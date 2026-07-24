import { parsePage } from "../services/parsePage.js";

describe("parsePage", () => {
  test("parses a normal HTML page", () => {
    const html = `
      <html>
        <head>
          <title>Page Pulse Test</title>
          <meta name="description" content="Testing Page Pulse">
        </head>
        <body>
          <h1>Hello World</h1>
          <p>This is a sample webpage.</p>
          <img src="one.jpg" alt="Landscape">
          <img src="two.jpg">
        </body>
      </html>
    `;

    expect(parsePage(html)).toEqual({
      title: "Page Pulse Test",
      metaDescription: "Testing Page Pulse",
      h1Count: 1,
      imagesMissingAlt: 1,
      wordCount: 7
    });
  });

  test("handles missing metadata and empty body", () => {
    expect(parsePage("<html><head></head><body></body></html>")).toEqual({
      title: "",
      metaDescription: "",
      h1Count: 0,
      imagesMissingAlt: 0,
      wordCount: 0
    });
  });

  test("throws for non-string input", () => {
    expect(() => parsePage(null)).toThrow("HTML must be a string.");
  });
});
