export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to NMTSA
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          National Model Transportation Student Association Website
        </p>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4">
            <a
              href="/login"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Admin Login
            </a>
            <a
              href="/admin"
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Admin Panel
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Backend is ready! API endpoints are running at /api/*
          </p>
        </div>
      </main>
    </div>
  );
}
