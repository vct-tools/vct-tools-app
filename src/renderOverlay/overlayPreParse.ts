import type { OverlaySettings } from "./overlayType";

export function ceromonyFilter(ceromony: string, settings: OverlaySettings) {
  if (ceromony == "Round Win") return "Round Win";
  if (ceromony == "Clutch") {
    if (settings.roundOutcomeBanner.clutch) return "Clutch";
    else return "Round Win";
  }
  if (ceromony == "Flawless") {
    if (settings.roundOutcomeBanner.flawless) return "Flawless";
    else return "Round Win";
  }
  if (ceromony == "Ace") {
    if (settings.roundOutcomeBanner.ace) return "Ace";
    else return "Round Win";
  }
  if (ceromony == "Team Ace") {
    if (settings.roundOutcomeBanner.teamAce) return "Team Ace";
    else return "Round Win";
  }
  if (ceromony == "Thrifty") {
    if (settings.roundOutcomeBanner.thrifty) return "Thrifty";
    else return "Round Win";
  }

  return "Round Win";
}

export function nameFilter(name: string, tagline: string, settings: OverlaySettings) {
  let nT = "";

  if (settings.nameType == "Name") nT = name;
  else nT = name + "#" + tagline;

  if (settings.redTeamHideShortName) {
    if (nT.startsWith(settings.redTeamShortName)) {
      nT = nT.substring(4);
    }
  }

  if (settings.blueTeamHideShortName) {
    if (nT.startsWith(settings.blueTeamShortName)) {
      nT = nT.substring(4);
    }
  }

  return nT;
}

export function getSide(startingSide: "attack" | "defense", round: number): "attack" | "defense" {
  if (round <= 12) {
    return startingSide;
  } else if (round >= 13 && round <= 24) {
    return startingSide == "attack" ? "defense" : "attack";
  } else {
    return (round % 2 == 1) == (startingSide == "attack") ? "attack" : "defense";
  }
}
