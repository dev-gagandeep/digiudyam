export default function AdminLoading() {
  return <div className="admin-page" aria-label="Loading admin page"><div className="admin-heading"><div><span>LOADING / LIVE DATA</span><h1>Preparing your workspace.</h1><p>Fetching the latest operational records securely.</p></div></div><div className="admin-loading-grid" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <div className="admin-skeleton" key={index}/>)}</div></div>;
}
