import { useState } from "react";

export default function AuditForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");

  function submit(event) {
    event.preventDefault();
    onSubmit(url.trim());
  }

  return (
    <form className="card shadow-sm border-0 p-3" onSubmit={submit}>
      <label htmlFor="url" className="form-label fw-semibold">
        Website URL
      </label>
      <div className="input-group input-group-lg">
        <input
          id="url"
          className="form-control"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
        />
        <button className="btn btn-dark px-4" disabled={loading}>
          {loading ? "Auditing..." : "Audit Page"}
        </button>
      </div>
    </form>
  );
}
