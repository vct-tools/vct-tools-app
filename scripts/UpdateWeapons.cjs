const fs = require("fs");
const path = require("path");

(async () => {
  const r = await fetch("https://valorant-api.com/v1/weapons");
  const weaponsData = await r.json();

  for (const weapon of weaponsData.data) {
    // Get icon
    const icon = await fetch(weapon.killStreamIcon);

    // Save icon
    const nb = await icon.arrayBuffer();
    const buf = Buffer.from(nb);
    fs.writeFileSync(
      path.join(__dirname, "../src/assets/images/weapons/", `${weapon.displayName.replace("/", "")}_icon.png`),
        buf
    );

    console.log(`Saved ${weapon.displayName}`);
  }
})();
