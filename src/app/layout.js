import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Firebase auth",
  description: "Firebase authentication with NEXT.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="relative overflow-x-hidden dark:bg-dark">
          {children}
        </main>
        </body>
    </html>
  );
}
