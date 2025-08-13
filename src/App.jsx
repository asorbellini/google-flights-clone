import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Home = lazy(() => import("./pages/Home"))

function App() {
  return (
    <Router>
      <Suspense fallback={<div />}> 
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
