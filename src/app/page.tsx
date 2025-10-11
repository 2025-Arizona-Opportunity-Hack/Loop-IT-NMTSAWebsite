export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Loop IT
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          National Model Transportation Student Association Website
        </p>
        <div className="inline-flex gap-4">
          <a
            href="#"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-indigo-600 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </main>
    </div>
  );
}
