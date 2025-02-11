const fs = require("fs");
const path = require("path");

(async () => {
  const r = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
  const agentData = await r.json();

  for (const agent of agentData.data) {
    for (const ability of agent.abilities) {
      if (ability.slot == "Passive") continue;

      // Get icon
      const icon = await fetch(ability.displayIcon);
      // Save icon
      const nb = await icon.arrayBuffer();
      const buf = Buffer.from(nb);
      if (fs.existsSync(path.join(__dirname, `../src/assets/images/abilities/${agent.displayName.replace("/", "")}/`)) === false) {
        fs.mkdirSync(path.join(__dirname, `../src/assets/images/abilities/${agent.displayName.replace("/", "")}/`
        ));
      }
      fs.writeFileSync(
        path.join(__dirname, `../src/assets/images/abilities/${agent.displayName.replace("/", "")}/`, `${ability.displayName.replace("/", "").replaceAll(" ", "_").toLowerCase()}.png`),
        buf
      );
      console.log(`Saved ${agent.displayName} ${ability.displayName}`);
    }
  }
})();
