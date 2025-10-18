import Navbar from "./Navbar";
import Footer from "./Footer";

// ---------------------------------------------------------------
// Main Layout Component
// ---------------------------------------------------------------
export default function MainLayout({ children, coordinates }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ---------------- Navbar Section ---------------- */}
      <Navbar coordinates={coordinates} />

      {/* ---------------- Main Content Section ---------------- */}
      <div className="flex-1 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-100">
        <main className="container mx-auto px-4 py-6 space-y-6">
          {children}
        </main>
      </div>

      {/* ---------------- Footer Section ---------------- */}
      <Footer />
    </div>
  );
}
