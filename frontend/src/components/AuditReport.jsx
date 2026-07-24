function Metric({ label, value }) {
  return (
    <div className="col-md-6">
      <div className="metric h-100">
        <div className="text-secondary small">{label}</div>
        <div className="fs-5 fw-semibold text-break">{value}</div>
      </div>
    </div>
  );
}

export default function AuditReport({ report }) {
  return (
    <section className="card shadow-sm border-0 mt-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
        <h2 className="h4 mb-0">Audit Results</h2>
        <span className="badge text-bg-success">HTTP {report.status}</span>
      </div>

      <p className="small text-secondary text-break">{report.url}</p>

      <div className="row g-3">
        <Metric label="Response Time" value={`${report.responseTime} ms`} />
        <Metric label="Page Title" value={report.title || "Not found"} />
        <Metric
          label="Meta Description"
          value={report.metaDescription || "Not found"}
        />
        <Metric label="H1 Count" value={report.h1Count} />
        <Metric label="Images Missing Alt" value={report.imagesMissingAlt} />
        <Metric label="Approx. Word Count" value={report.wordCount} />
      </div>
    </section>
  );
}
