import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <main className="container py-4">
      <header className="d-flex align-items-center gap-3 mb-4">
        <img src="/octofitapp-small.png" alt="" width="48" height="48" />
        <h1 className="mb-0">OctoFit Tracker</h1>
      </header>
      <Routes>
        <Route path="/" element={<p>Welcome to OctoFit Tracker.</p>} />
        <Route path="*" element={<p>Page not found.</p>} />
      </Routes>
    </main>
  )
}

export default App
