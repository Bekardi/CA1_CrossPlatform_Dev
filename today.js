const electron = require("electron");
const { ipcRenderer } = electron;
ipcRenderer.send("servicesBikes:request:today");
ipcRenderer.on("servicesBikes:response:today", (event, servicesBikesX) => {
    const listDiv = document.getElementById("list");
    listDiv.innerHTML = "";
    servicesBikesX.forEach(servicesBikes => {
        const servicesBikesDiv = document.createElement("div");
        servicesBikesDiv.className = "divAppoit";
        const nameParagraph = document.createElement("p");
        nameParagraph.innerHTML = `Name: ${servicesBikes.name}`;
        const numberParagraph = document.createElement("p");
        numberParagraph.innerHTML = `Phone Number: ${servicesBikes.number}`;
        const dateParagraph = document.createElement("p");
        dateParagraph.innerHTML = `Date: ${servicesBikes.date}`;
        const hourParagraph = document.createElement("p");
        hourParagraph.innerHTML = `Hour: ${servicesBikes.hour}`;
        const symptomsParagraph = document.createElement("p");
        symptomsParagraph.innerHTML = `Symptoms: ${servicesBikes.symptoms}`;
        const doneParagraph = document.createElement("p");
        doneParagraph.innerHTML = `Done: ${servicesBikes.done ? "Yes" : "No"}`;
        const doneButton = document.createElement("button");
        doneButton.innerHTML = "Done";
        doneButton.className = "btnGeral";
        doneButton.disabled = servicesBikes.done ? true : false;
        doneButton.onclick = () => done(servicesBikes.id);
        servicesBikesDiv.appendChild(nameParagraph);
        servicesBikesDiv.appendChild(numberParagraph);
        servicesBikesDiv.appendChild(dateParagraph);
        servicesBikesDiv.appendChild(doneParagraph);
        servicesBikesDiv.appendChild(hourParagraph);
        servicesBikesDiv.appendChild(symptomsParagraph);
        servicesBikesDiv.appendChild(doneButton);
        listDiv.append(servicesBikesDiv);
    });
});
const done = id => {
    ipcRenderer.send("servicesBikes:done", id);
};