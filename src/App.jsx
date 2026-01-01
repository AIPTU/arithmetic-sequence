import { useState, Suspense, lazy } from "react";
import PropTypes from "prop-types";
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
              Arithmetic Sequence
            </h1>
            <ButtonGroup>
              <Button
                type="arithmetic"
                onClick={() => handleNavigation("generate", "arithmetic")}
              >
                Generate Arithmetic Sequence
              </Button>
              <Button
                type="arithmetic"
                onClick={() => handleNavigation("solve", "arithmetic")}
              >
                Solve Missing Arithmetic Sequence
              </Button>
              <Button
                type="geometric"
                onClick={() => handleNavigation("generate", "geometric")}
              >
                Generate Geometric Sequence
              </Button>
              <Button
                type="geometric"
                onClick={() => handleNavigation("solve", "geometric")}
              >
                Solve Missing Geometric Sequence
              </Button>
              <Button
                type="alphabet"
                onClick={() => handleNavigation("generate", "alphabet")}
              >
                Generate Alphabet Sequence
              </Button>
              <Button
                type="alphabet"
                onClick={() => handleNavigation("solve", "alphabet")}
              >
                Solve Missing Alphabet Sequence
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const ButtonGroup = ({ children }) => (
  <div className="button-group">{children}</div>
);

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
