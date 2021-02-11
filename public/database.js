let db;
const request = window.indexedDB.open("budgetDB", 1);

request.onsuccess = (event) => {
  console.log(request.result);
  db = target.result;
  if (navigator.onLine) {
    checkDatabase();
    //Need to declare this function
  }
};

request.onupgradeneeded = ({ target }) => {
  const db = target.result;
  db.createObjectStore("budgetDB", { autoIncrement: true });
};
