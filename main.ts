// ==UserScript==
// @name        linktrust-downloader
// @namespace   LT
// @downloadURL https://github.com/NicolasET/lt-downloader/raw/main/main.js
// @updateURL		https://github.com/NicolasET/lt-downloader/raw/main/main.js
// @match       https://account.linktrust.com/New/Reports/*
// @grant       none
// @version     1.01
// @author      NicolasET
// @description LT columns downloader data
// ==/UserScript==

(() => {
  "use strict";
  const existingDiv = document.getElementById("divResults");
  if (existingDiv) {
    const children = existingDiv.children[0] as HTMLElement;
    children.style.position = "relative";

    const newDiv = document.createElement("div");
    newDiv.style.position = "absolute";
    newDiv.style.top = "143px";
    newDiv.style.left = "42px";

    // Create a new button element
    const newButton = document.createElement("input");
    newButton.type = "button";
    newButton.value = "Manual";
    newButton.onclick = () => {
      const input = prompt("Nombre columna");
      const { columnIndex, table } = searchTableColumn(input);
      if (columnIndex !== -1) {
        const columnValues: string[] = [];
        const row = table?.querySelectorAll("tr.table-body-normal");
        row?.forEach((row) => {
          const cells = row.querySelectorAll("td");
          columnValues.push(cells[columnIndex].innerText.trim());
        });

        const dataString = JSON.stringify(columnValues, null, 2);
        navigator.clipboard.writeText(dataString).then(() => {
          window.alert("Datos copiados");
        });
      } else {
        window.alert("Columna no encontrada");
      }
    };
    newDiv.appendChild(newButton);

    // Insert the new button if the button exists
    existingDiv.appendChild(newDiv);
  }

  const searchTableColumn = (value: string | null) => {
    let columnIndex = -1;
    const table = document.querySelector("table.clear.top-margin-small");
    const headers = table
      ?.querySelector("tr.table-head")
      ?.getElementsByTagName("td");
    if (headers) {
      for (let i = 0; i < headers.length; i++) {
        if (headers[i].innerText.trim() === value) {
          columnIndex = i;
          break;
        }
      }
    }

    return { columnIndex, table };
  };

  console.log("init");
})();
