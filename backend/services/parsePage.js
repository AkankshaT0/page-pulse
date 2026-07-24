import * as cheerio from "cheerio";

export function parsePage(html) {
  if (typeof html !== "string") {
    throw new TypeError("HTML must be a string.");
  }

  const $ = cheerio.load(html);

  const title = $("title").first().text().trim();
  const metaDescription =
    $('meta[name="description"]').first().attr("content")?.trim() || "";

  const h1Count = $("h1").length;

  const imagesMissingAlt = $("img").filter((_index, element) => {
    const alt = $(element).attr("alt");
    return alt === undefined || alt.trim() === "";
  }).length;

  $("script, style, noscript, template").remove();
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;

  return {
    title,
    metaDescription,
    h1Count,
    imagesMissingAlt,
    wordCount
  };
}
