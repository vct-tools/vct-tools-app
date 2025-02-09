import Astra from "@/assets/images/agents/Astra_icon.png";
import Breach from "@/assets/images/agents/Breach_icon.png";
import Brimstone from "@/assets/images/agents/Brimstone_icon.png";
import Chamber from "@/assets/images/agents/Chamber_icon.png";
import Clove from "@/assets/images/agents/Clove_icon.png";
import Cypher from "@/assets/images/agents/Cypher_icon.png";
import Deadlock from "@/assets/images/agents/Deadlock_icon.png";
import Fade from "@/assets/images/agents/Fade_icon.png";
import Gekko from "@/assets/images/agents/Gekko_icon.png";
import Harbor from "@/assets/images/agents/Harbor_icon.png";
import Iso from "@/assets/images/agents/Iso_icon.png";
import Jett from "@/assets/images/agents/Jett_icon.png";
import KAYO from "@/assets/images/agents/KAYO_icon.png";
import Killjoy from "@/assets/images/agents/Killjoy_icon.png";
import Neon from "@/assets/images/agents/Neon_icon.png";
import Omen from "@/assets/images/agents/Omen_icon.png";
import Phoenix from "@/assets/images/agents/Phoenix_icon.png";
import Raze from "@/assets/images/agents/Raze_icon.png";
import Reyna from "@/assets/images/agents/Reyna_icon.png";
import Sage from "@/assets/images/agents/Sage_icon.png";
import Skye from "@/assets/images/agents/Skye_icon.png";
import Sova from "@/assets/images/agents/Sova_icon.png";
import Tejo from "@/assets/images/agents/Tejo_icon.png";
import Viper from "@/assets/images/agents/Viper_icon.png";
import Vyse from "@/assets/images/agents/Vyse_icon.png";
import Yoru from "@/assets/images/agents/Yoru_icon.png";

import Duelist from "@/assets/images/agents_roles/DuelistClassSymbol.webp";
import Controller from "@/assets/images/agents_roles/ControllerClassSymbol.webp";
import Sentinel from "@/assets/images/agents_roles/SentinelClassSymbol.webp";
import Initiator from "@/assets/images/agents_roles/InitiatorClassSymbol.webp";

enum Role {
  Duelist,
  Controller,
  Sentinel,
  Initiator
}

const roleImages = [
  {
    role: Role.Duelist,
    image: Duelist
  },
  {
    role: Role.Controller,
    image: Controller
  },
  {
    role: Role.Sentinel,
    image: Sentinel
  },
  {
    role: Role.Initiator,
    image: Initiator
  }
]

const agents = [
  { name: "Astra", icon: Astra, role: Role.Controller },
  { name: "Breach", icon: Breach, role: Role.Initiator },
  { name: "Brimstone", icon: Brimstone, role: Role.Controller },
  { name: "Chamber", icon: Chamber, role: Role.Sentinel },
  { name: "Clove", icon: Clove, role: Role.Controller },
  { name: "Cypher", icon: Cypher, role: Role.Sentinel },
  { name: "Deadlock", icon: Deadlock, role: Role.Sentinel },
  { name: "Fade", icon: Fade, role: Role.Initiator },
  { name: "Gekko", icon: Gekko, role: Role.Initiator },
  { name: "Harbor", icon: Harbor, role: Role.Controller },
  { name: "Iso", icon: Iso, role: Role.Duelist },
  { name: "Jett", icon: Jett, role: Role.Duelist },
  { name: "KAYO", icon: KAYO, role: Role.Initiator },
  { name: "Killjoy", icon: Killjoy, role: Role.Sentinel },
  { name: "Neon", icon: Neon, role: Role.Duelist },
  { name: "Omen", icon: Omen, role: Role.Controller },
  { name: "Phoenix", icon: Phoenix, role: Role.Duelist },
  { name: "Raze", icon: Raze, role: Role.Duelist },
  { name: "Reyna", icon: Reyna, role: Role.Duelist },
  { name: "Sage", icon: Sage, role: Role.Sentinel },
  { name: "Skye", icon: Skye, role: Role.Initiator },
  { name: "Sova", icon: Sova, role: Role.Initiator },
  { name: "Tejo", icon: Tejo, role: Role.Initiator },
  { name: "Viper", icon: Viper, role: Role.Controller },
  { name: "Vyse", icon: Vyse, role: Role.Sentinel },
  { name: "Yoru", icon: Yoru, role: Role.Duelist },
];

export default agents;
export { roleImages, Role };
