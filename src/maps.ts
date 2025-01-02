import Ascent from "@/assets/images/ascent.webp";
import Abyss from "@/assets/images/abyss.webp";
import Bind from "@/assets/images/bind.webp";
import Breeze from "@/assets/images/breeze.webp";
import Fracture from "@/assets/images/fracture.webp";
import Haven from "@/assets/images/haven.webp";
import Icebox from "@/assets/images/icebox.webp";
import Lotus from "@/assets/images/lotus.webp";
import Pearl from "@/assets/images/pearl.webp";
import Split from "@/assets/images/split.webp";
import Sunset from "@/assets/images/sunset.webp";

const maps = [
  {
    name: "Ascent",
    image: Ascent
  },
  {
    name: "Abyss",
    image: Abyss
  },
  {
    name: "Bind",
    image: Bind
  },
  {
    name: "Breeze",
    image: Breeze
  },
  {
    name: "Fracture",
    image: Fracture
  },
  {
    name: "Haven",
    image: Haven
  },
  {
    name: "Icebox",
    image: Icebox
  },
  {
    name: "Lotus",
    image: Lotus
  },
  {
    name: "Pearl",
    image: Pearl
  },
  {
    name: "Split",
    image: Split
  },
  {
    name: "Sunset",
    image: Sunset
  }
];

enum sides {
  ATTACK,
  DEFENSE
}

export { maps, sides };
