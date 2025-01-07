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

import AscentMap from "@/assets/images/ascent_map.webp";
import AbyssMap from "@/assets/images/abyss_map.webp";
import BindMap from "@/assets/images/bind_map.webp";
import BreezeMap from "@/assets/images/breeze_map.webp";
import FractureMap from "@/assets/images/fracture_map.webp";
import HavenMap from "@/assets/images/haven_map.webp";
import IceboxMap from "@/assets/images/icebox_map.webp";
import LotusMap from "@/assets/images/lotus_map.webp";
import PearlMap from "@/assets/images/pearl_map.webp";
import SplitMap from "@/assets/images/split_map.webp";
import SunsetMap from "@/assets/images/sunset_map.webp";

const maps = [
  {
    name: "Ascent",
    image: Ascent,
    map: AscentMap,
    callouts: [
      { x: 135, y: 442, name: "B Boat House" },
      { x: 199, y: 358, name: "B Main" },
      { x: 278, y: 358, name: "B Lobby" },
      { x: 67, y: 215, name: "Defender Side Spawn" },
      { x: 154, y: 227, name: "Mid Pizza" },
      { x: 148, y: 273, name: "Mid Market" },
      { x: 198, y: 249, name: "Mid Bottom" },
      { x: 262, y: 207, name: "Mid Catwalk" },
      { x: 260, y: 296, name: "Mid Link" },
      { x: 420, y: 284, name: "Attacker Side Spawn" },
      { x: 333, y: 206, name: "Mid Top" },
      { x: 230, y: 169, name: "Mid Cubby" },
      { x: 198, y: 148, name: "A Tree" },
      { x: 122, y: 143, name: "A Window" },
      { x: 139, y: 175, name: "A Garden" },
      { x: 122, y: 77, name: "A Rafters" },
      { x: 243, y: 96, name: "A Main" },
      { x: 299, y: 135, name: "A Lobby" }
    ]
  },
  {
    name: "Abyss",
    image: Abyss,
    map: AbyssMap,
    callouts: [
      { x: 42, y: 223, name: "Defender Side Spawn" },
      { x: 96, y: 101, name: "A Secret" },
      { x: 128, y: 59, name: "A Security" },
      { x: 149, y: 139, name: "A Link" },
      { x: 246, y: 131, name: "A Tower" },
      { x: 236, y: 23, name: "A Bridge" },
      { x: 314, y: 61, name: "A Main" },
      { x: 398, y: 125, name: "A Lobby" },
      { x: 237, y: 184, name: "A Vent" },
      { x: 273, y: 229, name: "Mid Catwalk" },
      { x: 153, y: 222, name: "Mid Top" },
      { x: 232, y: 269, name: "Mid Library" },
      { x: 330, y: 260, name: "Mid Bottom" },
      { x: 155, y: 331, name: "B Link" },
      { x: 317, y: 320, name: "Mid Bend" },
      { x: 145, y: 409, name: "B Tower" },
      { x: 279, y: 488, name: "B Danger" },
      { x: 336, y: 455, name: "B Nest" },
      { x: 313, y: 383, name: "B Main" },
      { x: 410, y: 394, name: "B Lobby" },
      { x: 324, y: 321, name: "Mid Bend" },
      { x: 436, y: 219, name: "Attacker Side Spawn" }
    ]
  },
  {
    name: "Bind",
    image: Bind,
    map: BindMap,
    callouts: [
      { x: 260, y: 52, name: "Defender Side Spawn" },
      { x: 379, y: 106, name: "A Tower" },
      { x: 142, y: 103, name: "B Hall" },
      { x: 80, y: 158, name: "B Elbow" },
      { x: 123, y: 213, name: "B Garden" },
      { x: 73, y: 219, name: "B Teleporter" },
      { x: 95, y: 255, name: "B Long" },
      { x: 124, y: 309, name: "B Fountain" },
      { x: 207, y: 298, name: "B Link" },
      { x: 261, y: 289, name: "A Link" },
      { x: 306, y: 264, name: "A Short" },
      { x: 197, y: 259, name: "B Short" },
      { x: 162, y: 218, name: "B Window" },
      { x: 230, y: 223, name: "B Exit" },
      { x: 299, y: 231, name: "A Cubby" },
      { x: 304, y: 204, name: "A Teleporter" },
      { x: 311, y: 165, name: "A Lamps" },
      { x: 419, y: 218, name: "A Bath" },
      { x: 375, y: 311, name: "A Lobby" },
      { x: 302, y: 368, name: "Attacker Side Cave" },
      { x: 297, y: 450, name: "Attacker Side Spawn" }
    ]
  },
  {
    name: "Breeze",
    image: Breeze,
    map: BreezeMap,
    callouts: [
      { x: 223, y: 425, name: "Attacker Side Spawn" },
      { x: 146, y: 384, name: "Attacker Side Snake" },
      { x: 67, y: 323, name: "B Window" },
      { x: 157, y: 308, name: "Mid Cannon" },
      { x: 68, y: 242, name: "B Main" },
      { x: 133, y: 205, name: "B Elbow" },
      { x: 22, y: 146, name: "B Back" },
      { x: 126, y: 118, name: "B Wall" },
      { x: 166, y: 149, name: "B Tunnel" },
      { x: 216, y: 172, name: "Mid Top" },
      { x: 241, y: 253, name: "Mid Pillar" },
      { x: 238, y: 323, name: "Mid Bottom" },
      { x: 334, y: 395, name: "A Lobby" },
      { x: 322, y: 324, name: "A Rope" },
      { x: 380, y: 337, name: "A Shop" },
      { x: 421, y: 245, name: "A Pyramids" },
      { x: 322, y: 276, name: "A Hall" },
      { x: 284, y: 280, name: "Mid Chute" },
      { x: 302, y: 238, name: "Mid Wood Doors" },
      { x: 333, y: 198, name: "A Switch" },
      { x: 321, y: 169, name: "A Metal Doors" },
      { x: 358, y: 121, name: "A Bridge" },
      { x: 285, y: 65, name: "Defender Side Spawn" },
      { x: 186, y: 62, name: "Defender Side Arches" }
    ]
  },
  {
    name: "Fracture",
    image: Fracture,
    map: FractureMap,
    callouts: [
      { x: 246, y: 403, name: "Attacker Side Spawn" },
      { x: 145, y: 406, name: "B Tree" },
      { x: 74, y: 350, name: "B Main" },
      { x: 121, y: 335, name: "B Tunnel" },
      { x: 185, y: 283, name: "B Canteen" },
      { x: 149, y: 264, name: "B Generator" },
      { x: 57, y: 224, name: "B Tower" },
      { x: 183, y: 213, name: "B Link" },
      { x: 120, y: 169, name: "B Arcade" },
      { x: 178, y: 143, name: "B Bench" },
      { x: 253, y: 72, name: "Attacker Side Bridge" },
      { x: 335, y: 69, name: "A Gate" },
      { x: 347, y: 142, name: "A Dish" },
      { x: 393, y: 209, name: "A Drop" },
      { x: 317, y: 321, name: "A Rope" },
      { x: 353, y: 355, name: "A Door" },
      { x: 356, y: 383, name: "A Hall" },
      { x: 413, y: 341, name: "A Main" },
      { x: 253, y: 217, name: "Defender Side Spawn" },
      { x: 329, y: 228, name: "A Link" },
      { x: 254, y: 217, name: "Defender Side Spawn" }
    ]
  },
  {
    name: "Haven",
    image: Haven,
    map: HavenMap,
    callouts: [
      { x: 61, y: 211, name: "Defender Side Spawn" },
      { x: 161, y: 331, name: "C Link" },
      { x: 208, y: 321, name: "C Window" },
      { x: 260, y: 315, name: "C Garage" },
      { x: 312, y: 313, name: "Mid Doors" },
      { x: 290, y: 254, name: "Mid Courtyard" },
      { x: 335, y: 257, name: "Mid Window" },
      { x: 146, y: 250, name: "B Back" },
      { x: 197, y: 168, name: "A Link" },
      { x: 238, y: 193, name: "A Sewer" },
      { x: 311, y: 189, name: "A Lobby" },
      { x: 369, y: 195, name: "A Garden" },
      { x: 296, y: 104, name: "A Long" },
      { x: 153, y: 73, name: "A Tower" },
      { x: 452, y: 270, name: "Attacker Side Spawn" },
      { x: 362, y: 367, name: "C Lobby" },
      { x: 326, y: 424, name: "C Long" },
      { x: 298, y: 401, name: "C Cubby" }
    ]
  },
  {
    name: "Icebox",
    image: Icebox,
    map: IceboxMap,
    callouts: [
      { x: 69, y: 296, name: "Attacker Side Spawn" },
      { x: 210, y: 414, name: "A Belt" },
      { x: 260, y: 399, name: "A Nest" },
      { x: 297, y: 382, name: "A Pipes" },
      { x: 383, y: 395, name: "A Rafters" },
      { x: 344, y: 346, name: "A Screen" },
      { x: 301, y: 311, name: "Mid Pallet" },
      { x: 341, y: 275, name: "Mid Boiler" },
      { x: 212, y: 267, name: "Mid Blue" },
      { x: 265, y: 239, name: "B Tube" },
      { x: 351, y: 237, name: "B Kitchen" },
      { x: 317, y: 218, name: "B Snow Pile" },
      { x: 284, y: 193, name: "B Orange" },
      { x: 459, y: 278, name: "Defender Side Spawn" },
      { x: 392, y: 210, name: "B Hut" },
      { x: 339, y: 169, name: "B Hall" },
      { x: 360, y: 153, name: "B Fence" },
      { x: 404, y: 113, name: "B Back" },
      { x: 392, y: 80, name: "B Snowman" },
      { x: 230, y: 80, name: "B Yellow" },
      { x: 197, y: 111, name: "B Cubby" },
      { x: 226, y: 175, name: "B Green" },
      { x: 167, y: 201, name: "B Garage" }
    ]
  },
  {
    name: "Lotus",
    image: Lotus,
    map: LotusMap,
    callouts: [
      { x: 260, y: 413, name: "Attacker Side Spawn" },
      { x: 157, y: 387, name: "C Lobby" },
      { x: 136, y: 313, name: "C Mound" },
      { x: 110, y: 272, name: "C Main" },
      { x: 39, y: 251, name: "C Bend" },
      { x: 140, y: 229, name: "C Waterfall" },
      { x: 178, y: 188, name: "C Link" },
      { x: 96, y: 166, name: "C Hall" },
      { x: 197, y: 133, name: "C Gravel" },
      { x: 214, y: 280, name: "B Main" },
      { x: 247, y: 336, name: "B Pillars" },
      { x: 332, y: 364, name: "A Lobby" },
      { x: 275, y: 187, name: "B Upper" },
      { x: 304, y: 240, name: "A Link" },
      { x: 344, y: 308, name: "A Root" },
      { x: 404, y: 307, name: "A Rubble" },
      { x: 371, y: 251, name: "A Main" },
      { x: 428, y: 234, name: "A Tree" },
      { x: 428, y: 163, name: "A Hut" },
      { x: 371, y: 156, name: "A Stairs" },
      { x: 399, y: 112, name: "A Top" },
      { x: 451, y: 112, name: "A Drop" },
      { x: 298, y: 78, name: "Defender Side Spawn" }
    ]
  },
  {
    name: "Pearl",
    image: Pearl,
    map: PearlMap,
    callouts: [
      { x: 263, y: 447, name: "Attacker Side Spawn" },
      { x: 143, y: 386, name: "B Club" },
      { x: 45, y: 348, name: "B Ramp" },
      { x: 44, y: 261, name: "B Main" },
      { x: 34, y: 188, name: "B Screen" },
      { x: 87, y: 148, name: "B Hall" },
      { x: 143, y: 202, name: "B Tower" },
      { x: 172, y: 180, name: "B Tunnel" },
      { x: 154, y: 261, name: "B Link" },
      { x: 198, y: 341, name: "Mid Shops" },
      { x: 222, y: 110, name: "Defender Side Records" },
      { x: 287, y: 145, name: "Defender Side Water" },
      { x: 251, y: 188, name: "Mid Connector" },
      { x: 259, y: 268, name: "Mid Doors" },
      { x: 268, y: 305, name: "Mid Plaza" },
      { x: 302, y: 367, name: "Mid Top" },
      { x: 368, y: 348, name: "A Restaurant" },
      { x: 347, y: 260, name: "A Art" },
      { x: 343, y: 182, name: "A Link" },
      { x: 457, y: 253, name: "A Main" },
      { x: 283, y: 42, name: "Defender Side Spawn" },
      { x: 377, y: 121, name: "A Flowers" },
      { x: 411, y: 81, name: "A Secret" },
      { x: 454, y: 151, name: "A Dugout" }
    ]
  },
  {
    name: "Split",
    image: Split,
    map: SplitMap,
    callouts: [
      { x: 131, y: 472, name: "B Back" },
      { x: 272, y: 432, name: "B Garage" },
      { x: 344, y: 398, name: "C Lobby" },
      { x: 321, y: 347, name: "B Link" },
      { x: 310, y: 274, name: "Mid Bottom" },
      { x: 239, y: 272, name: "Mid Top" },
      { x: 231, y: 305, name: "Mid Mail" },
      { x: 222, y: 343, name: "B Tower" },
      { x: 175, y: 376, name: "B Rafters" },
      { x: 106, y: 396, name: "B Alley" },
      { x: 145, y: 307, name: "B Stairs" },
      { x: 66, y: 266, name: "Defender Side Spawn" },
      { x: 196, y: 214, name: "Mid Vent" },
      { x: 150, y: 163, name: "A Tower" },
      { x: 235, y: 176, name: "A Ramps" },
      { x: 248, y: 108, name: "A Main" },
      { x: 111, y: 61, name: "A Back" },
      { x: 76, y: 130, name: "A Screens" },
      { x: 327, y: 83, name: "A Lobby" },
      { x: 427, y: 274, name: "Attacker Side Spawn" },
      { x: 174, y: 132, name: "A Rafters" }
    ]
  },
  {
    name: "Sunset",
    image: Sunset,
    map: SunsetMap,
    callouts: [
      { x: 269, y: 437, name: "Attacker Side Spawn" },
      { x: 175, y: 373, name: "B Lobby" },
      { x: 110, y: 311, name: "B Main" },
      { x: 152, y: 239, name: "B Market" },
      { x: 106, y: 132, name: "B Boba" },
      { x: 231, y: 156, name: "Mid Top" },
      { x: 237, y: 227, name: "Mid Courtyard" },
      { x: 210, y: 306, name: "Mid Bottom" },
      { x: 283, y: 274, name: "Mid Tiles" },
      { x: 244, y: 49, name: "Defender Side Spawn" },
      { x: 331, y: 137, name: "A Link" },
      { x: 383, y: 88, name: "A Alley" },
      { x: 458, y: 193, name: "A Elbow" },
      { x: 377, y: 251, name: "A Main" },
      { x: 376, y: 318, name: "A Lobby" }
    ]
  }
];

enum sides {
  ATTACK,
  DEFENSE
}

export { maps, sides };
