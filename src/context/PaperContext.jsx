import { useEffect, useState, createContext } from "react";
import { getPapers } from "../database/PaperDB";
import PropTypes from "prop-types";

export const PaperContext = createContext();

export const PaperUpdateContext = createContext((paperList) => paperList);

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
