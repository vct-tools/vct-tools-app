const fs = require("fs");
const path = require("path");

(async () => {
  const r = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true");
  const agentData = await r.json();

  for (const agent of agentData.data) {
    // Get icon
    const icon = await fetch(agent.displayIcon);
    // Save icon
    const nb = await icon.arrayBuffer();
    const buf = Buffer.from(nb);
    fs.writeFileSync(
      path.join(__dirname, "../src/assets/images/agents/", `${agent.displayName.replace("/", "")}_icon.png`),
      buf
    );
    console.log(`Saved ${agent.displayName}`);
  }
})();
