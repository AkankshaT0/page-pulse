import { useState } from "react";
import AuditForm from "./components/AuditForm.jsx";
import AuditReport from "./components/AuditReport.jsx";
import Footer from "./components/Footer.jsx";
import { auditUrl } from "./services/auditApi.js";

export default function App() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAudit(url) {
    setLoading(true);
    setError("");
    setReport(null);

    try {
      setReport(await auditUrl(url));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-body-tertiary">
      <main className="container py-5 flex-grow-1">
        <div className="mx-auto page-shell">
          <header className="text-center mb-4">
            <span className="badge text-bg-dark mb-3">WEB AUDITOR</span>
            <h1 className="display-4 fw-bold">Page Pulse</h1>
            <p className="lead text-secondary">
              Audit any public webpage in seconds.
            </p>
          </header>

          <AuditForm onSubmit={handleAudit} loading={loading} />

          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              {error}
            </div>
          )}

          {report && <AuditReport report={report} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
