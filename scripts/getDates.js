const currentDate = new Date();
const currentYear = currentDate.getFullYear();
document.querySelector("#currentYear").textContent = currentYear;
let lastModif = new Date(document.lastModified);
lastModified = `Last Modification:  ${lastModif}`;
document.querySelector("#lastModified").textContent = lastModified;
