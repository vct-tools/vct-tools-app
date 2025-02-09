import { type Ref } from "vue";

type TeamRoster = {
  teamName: string;
  roster: {
    name: string;
    image: {
      imageType: "File Upload" | "Agent Portrait";
      agent: string;
      dataUri: null | string;
    },
    type: "Player" | "Substitute" | "Coach";
  }[]
};

const renderTeamRoster = async (teamRosterData: Ref<TeamRoster>, ctx: CanvasRenderingContext2D, mainCanvas: HTMLCanvasElement) => {
  let offsetX = 0;
  let offsetY = 100;
  let alt = false;
  let num = 0;

  console.log("Rendering team roster:", teamRosterData.value);
  console.log("Canvas dimensions:", mainCanvas.width, mainCanvas.height);

  for (const member of teamRosterData.value.roster) {
    console.log("Drawing member:", member);
    ctx.fillStyle = alt ? "rgb(32, 86, 95)" : "rgb(28, 66, 73)";
    console.log(`Drawing rect at (${offsetX}, ${offsetY}) with dimensions (150, 250)`);
    ctx.fillRect(offsetX, offsetY, 150, 250);
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(offsetX, offsetY + 150, 150, 100);
    offsetX += 150;
    num += 1;
    if (num % 4 == 0) {
      offsetX = 0;
      offsetY += 250;
      alt = !alt;
    }
    alt = !alt;
  }
}

export { type TeamRoster, renderTeamRoster };
