import React, { useState, Suspense, lazy } from "react";
import "./index.css";

const GenerateSequence = lazy(() => import("./components/GenerateSequence"));
const SolveMissing = lazy(() => import("./components/SolveMissing"));

const App = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [sequenceType, setSequenceType] = useState("arithmetic");

  const handleNavigation = (page, type = "arithmetic") => {
    setCurrentPage(page);
    setSequenceType(type);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "generate":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <GenerateSequence
              sequenceType={sequenceType}
              goBack={() => setCurrentPage(null)}
            />
          </Suspense>
        );
      case "solve":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <SolveMissing
              sequenceType={sequenceType}
              goBack={() => setCurrentPage(null)}
            />
          </Suspense>
        );
      default:
        return (
          <div className="main-menu fade-in">
            <h1 className="slide-down">
              Urutan Aritmatika
            </h1>
            <ButtonGroup>
              <Button
                type="arithmetic"
                onClick={() => handleNavigation("generate", "arithmetic")}
              >
                Membuat Urutan Aritmatika
              </Button>
              <Button
                type="arithmetic"
                onClick={() => handleNavigation("solve", "arithmetic")}
              >
                Menyelesaikan Urutan Aritmatika yang Hilang
              </Button>
              <Button
                type="geometric"
                onClick={() => handleNavigation("generate", "geometric")}
              >
                Membuat Urutan Geometri
              </Button>
              <Button
                type="geometric"
                onClick={() => handleNavigation("solve", "geometric")}
              >
                Menyelesaikan Urutan Geometri yang Hilang
              </Button>
              <Button
                type="alphabet"
                onClick={() => handleNavigation("generate", "alphabet")}
              >
                Membuat Urutan Abjad
              </Button>
              <Button
                type="alphabet"
                onClick={() => handleNavigation("solve", "alphabet")}
              >
                Menyelesaikan Urutan Abjad yang Hilang
              </Button>
            </ButtonGroup>
          </div>
        );
    }
  };

  return (
    <div className="container">
      {renderPage()}
      <footer className="footer">
        &copy; {new Date().getFullYear()} AIPTU. All rights reserved.
      </footer>
    </div>
  );
};

const Button = ({ children, type, onClick }) => (
  <button
    className={`menu-button ${type} button-hover`}
    onClick={onClick}
  >
    {children}
  </button>
);

const ButtonGroup = ({ children }) => (
  <div className="button-group">{children}</div>
);

export default App;
