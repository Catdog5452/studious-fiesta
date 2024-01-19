import { connectToDatabase } from "./initialisation";

/**
 * Retrieves all papers from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of papers.
 */
export async function getPapers() {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("papers", "readonly");
    const objectStore = transaction.objectStore("papers");
    const request = objectStore.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Retrieves a paper with the specified ID from the database.
 * @param {number} id - The ID of the paper to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the paper object or null if not found.
 */
export async function getPaper(id) {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("papers", "readonly");
    const objectStore = transaction.objectStore("papers");
    const request = objectStore.get(id);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Retrieves papers with the specified code from the database.
 * @param {string} code - The code of the papers to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array of papers.
 */
export async function getPapersByCode(code) {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("papers", "readonly");
    const objectStore = transaction.objectStore("papers");
    const index = objectStore.index("paperCode");
    const request = index.getAll(code);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Retrieves papers with the specified year from the database.
 * @param {number} year - The year of the papers to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array of papers.
 */
export async function getPapersByYear(year) {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("papers", "readonly");
    const objectStore = transaction.objectStore("papers");
    const index = objectStore.index("paperYear");
    const request = index.getAll(year);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Retrieves papers with the specified semester from the database.
 * @param {string} semester - The semester of the papers to retrieve.
 * @returns {Promise<Array>} A promise that resolves to an array of papers.
 */
export async function getPapersBySemester(semester) {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("papers", "readonly");
    const objectStore = transaction.objectStore("papers");
    const index = objectStore.index("paperSemester");
    const request = index.getAll(semester);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Adds a new paper to the database.
 * @param {Object} paper - The paper object to add.
 * @returns {Promise<number>} A promise that resolves to the ID of the added paper.
 */
export async function addPaper(paper) {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("papers", "readwrite");
    const objectStore = transaction.objectStore("papers");
    const request = objectStore.add(paper);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Updates an existing paper in the database.
 * @param {Object} paper - The updated paper object.
 * @returns {Promise<number>} A promise that resolves to the ID of the updated paper.
 */
export async function updatePaper(paper) {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("papers", "readwrite");
    const objectStore = transaction.objectStore("papers");
    const request = objectStore.put(paper);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Deletes a paper with the specified ID from the database.
 * @param {number} id - The ID of the paper to delete.
 * @returns {Promise<void>} A promise that resolves when the paper is successfully deleted.
 */
export async function deletePaper(id) {
  const db = await connectToDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("papers", "readwrite");
    const objectStore = transaction.objectStore("papers");
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
