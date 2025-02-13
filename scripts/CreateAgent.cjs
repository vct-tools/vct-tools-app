const fs = require("fs");
const path = require("path");

let finalFileImports = "";
let finalFileJson = "const agents = [";

function readableName(abilityName) {
  let words = [];

  for (const word of abilityName.split(" ")) {
    words.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  }

  return words.join("").replace("/", "").replace("'", "").replaceAll("-", "");
}

function fileName(abilityName) {
  return `${abilityName.replace("/", "").replaceAll(" ", "_").toLowerCase()}.png`;
}

(async () => {
  const r = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
  const agentData = await r.json();

  for (const agent of agentData.data) {
    finalFileJson += `{ name: "${agent.displayName}", icon: ${agent.displayName.replace("/", "")}, role: Role.${agent.role.displayName}, abilities: {`;

    for (const ability of agent.abilities) {
      if (ability.slot == "Passive") continue;

      finalFileImports += `import ${readableName(ability.displayName)} from "@/assets/images/abilities/${agent.displayName.replace("/", "")}/${fileName(ability.displayName)}";\n`;
      const u = {
        "Grenade": "Ability1",
        "Ability1": "Ability2",
        "Ability2": "Signature",
        "Ultimate": "Ultimate"
      }

      finalFileJson += `"${u[ability.slot]}": { name: "${ability.displayName}", icon: ${readableName(ability.displayName)} },`;
    }

    finalFileJson += "},},";
  }

  finalFileJson += "];";

  fs.writeFileSync("imports.txt", finalFileImports);
  fs.writeFileSync("json.txt", finalFileJson);
})();
