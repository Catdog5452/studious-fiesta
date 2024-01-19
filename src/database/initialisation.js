export function connectToDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      return reject("IndexedDB not supported");
    }

    const req = indexedDB.open("PMS", 1);

    req.onerror = (err) => {
      console.error("IndexedDB Error: " + err);
      reject(err);
    };

    req.onupgradeneeded = () => {
      console.log("IndexedDB Created/updated");
      const db = req.result;

      if (!db.objectStoreNames.contains("papers")) {
        const tOS = db.createObjectStore("papers", { keyPath: "id" });
        tOS.createIndex("paperCode", "paperCode", { unique: false });
        tOS.createIndex("paperYear", "paperYear", { unique: false });
        tOS.createIndex("paperSemester", "paperSemester", { unique: false });
      }
    };

    req.onsuccess = () => {
      console.log("IndexedDB Connected");
      resolve(req.result);
    };
  });
}
