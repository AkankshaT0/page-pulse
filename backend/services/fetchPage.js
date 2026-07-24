import axios from "axios";

export async function fetchPage(url) {
  return axios.get(url, {
    timeout: 8000,
    maxRedirects: 5,
    responseType: "text",
    maxContentLength: 2 * 1024 * 1024,
    headers: {
      "User-Agent": "PagePulse/1.0 (+https://digitalheroesco.com)",
      "Accept": "text/html,application/xhtml+xml"
    },
    validateStatus: () => true
  });
}
