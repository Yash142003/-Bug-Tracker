export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-400 to-indigo-900 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-700">
          {title}
        </h2>
        {subtitle && (
          <p className="text-center text-sm text-gray-500 mb-6">{subtitle}</p>
        )}

        {children}
      </div>
    </div>
  );
}
