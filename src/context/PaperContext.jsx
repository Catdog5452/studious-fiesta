import { useEffect, useState, createContext } from "react";
import { getPapers } from "../database/PaperDB";
import PropTypes from "prop-types";

// papers context
export const PaperContext = createContext();
export const PaperUpdateContext = createContext((paperList) => paperList);

// single paper context
export const PaperSingleContext = createContext();
export const PaperSingleUpdateContext = createContext((paper) => paper);

// single paper context provider
export function PaperSingleProvider({ children }) {
  const [paper, setPaper] = useState({});

  useEffect(() => {}, [paper]);

  return (
    <PaperSingleContext.Provider value={paper}>
      <PaperSingleUpdateContext.Provider value={setPaper}>
        {children}
      </PaperSingleUpdateContext.Provider>
    </PaperSingleContext.Provider>
  );
}

export function PapersProvider({ children }) {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    getPapers().then((papers) => setPapers(papers));
  }, []);

  useEffect(() => {}, [papers]);

  return (
    <PaperContext.Provider value={papers}>
      <PaperUpdateContext.Provider value={setPapers}>
        {children}
      </PaperUpdateContext.Provider>
    </PaperContext.Provider>
  );
}

PapersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

PaperSingleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
