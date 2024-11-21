import AEGIS from "./aegis/index.js";
let saveName = "untitled";
async function convertAssToLrc() {
    const assInput = document.getElementById("assInput").value;
    const lrcText = await AEGIS.parse(assInput);
    document.getElementById("lrcOutput").textContent = lrcText;
    document.getElementById("save").disabled = false;
}
await new Promise((r) => (window.onload = () => r(1)));
document.querySelector("button#convertAssToLrc").onclick = () =>
    convertAssToLrc();

document.getElementById("formFileLg").addEventListener("change", () => {
    const file = document.getElementById("formFileLg").files[0];
    saveName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById("assInput").value = e.target.result;
        document.getElementById("formFileLg").value = "";
    };
    reader.readAsText(file);
});

document.getElementById("save").addEventListener("click", () => {
    const lrcText = document.getElementById("lrcOutput").textContent;
    const blob = new Blob([lrcText], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${saveName}.lrc`;
    a.click();
});