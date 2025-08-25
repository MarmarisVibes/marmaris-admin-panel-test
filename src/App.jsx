import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Your Sidebar and Navbar */}
        <div className="flex-1">
          {/* Your Navbar */}
          <main className="p-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/business-signup" element={<BusinessSignUpPage />} />
              <Route path="/signups" element={<SignupsPage />} />
              <Route path="/media-uploads" element={<MediaUploadsPage />} />
              <Route path="/review-reports" element={<ReviewReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* ✅ Add this route */}
              <Route path="/business-signup" element={<BusinessSignUpPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;