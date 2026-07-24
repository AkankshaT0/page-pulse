import axios from "axios";
import { validatePublicHttpUrl } from "../utils/validateUrl.js";
import { fetchPage } from "../services/fetchPage.js";
import { parsePage } from "../services/parsePage.js";

export async function auditPage(req, res) {
  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({
      error: { code: "URL_REQUIRED", message: "URL is required." }
    });
  }

  try {
    const safeUrl = await validatePublicHttpUrl(url);

    const startedAt = Date.now();
    const response = await fetchPage(safeUrl);
    const responseTime = Date.now() - startedAt;

    const contentType = String(response.headers["content-type"] || "").toLowerCase();
    if (!contentType.includes("text/html")) {
      return res.status(415).json({
        error: {
          code: "NON_HTML_RESPONSE",
          message: "The requested URL did not return an HTML page."
        }
      });
    }

    const parsed = parsePage(response.data);

    return res.json({
      url: safeUrl,
      status: response.status,
      responseTime,
      ...parsed
    });
  } catch (error) {
    if (error.code === "INVALID_URL" || error.code === "UNSAFE_URL") {
      return res.status(400).json({
        error: { code: error.code, message: error.message }
      });
    }

    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        return res.status(504).json({
          error: { code: "TIMEOUT", message: "The target website took too long to respond." }
        });
      }

      return res.status(502).json({
        error: { code: "FETCH_FAILED", message: "Unable to fetch the target website." }
      });
    }

    console.error(error);
    return res.status(500).json({
      error: { code: "INTERNAL_ERROR", message: "An unexpected server error occurred." }
    });
  }
}
