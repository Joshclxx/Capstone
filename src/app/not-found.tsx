// app/not-found.tsx

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-7xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">
        DI AKO GINAWA PARA HANAPAN NG WALA!
      </h2>
      <p className="text-gray-600 mt-2">
        Sareh not sorry, ang page na hanap mo ay baka nasa BESTLINK wala sa IIH
        COLLEGE.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}
