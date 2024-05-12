import StarIcon from "@/assets/icons/releases/star.svg";
import FireIcon from "@/assets/icons/releases/trending.svg";
import NextIcon from "@/assets/icons/releases/next.svg";

import ActionIcon from "@/assets/icons/genres/action.svg";
import AdventureIcon from "@/assets/icons/genres/adventure.svg";
import RPGIcon from "@/assets/icons/genres/rpg.svg";
import ShooterIcon from "@/assets/icons/genres/shooter.svg";
import StrategyIcon from "@/assets/icons/genres/strategy.svg";

import PCIcon from "@/assets/icons/platforms/windows.svg";
import PlaystationIcon from "@/assets/icons/platforms/playstation.svg";
import XboxIcon from "@/assets/icons/platforms/xbox.svg";
import SwitchIcon from "@/assets/icons/platforms/switch.svg";

export const LINKS = [
  { nm: "Trending" },
  { nm: "New Releases", items: [
      { nm: "Last 30 days", Icon: StarIcon },
      { nm: "This week", Icon: FireIcon },
      { nm: "Next week", Icon: NextIcon },
    ]
  },
  { nm: "Genres", items: [
      { nm: "Action", Icon: ActionIcon },
      { nm: "Adventure", Icon: AdventureIcon },
      { nm: "RPG", Icon: RPGIcon },
      { nm: "Shooter", Icon: ShooterIcon },
      { nm: "Strategy", Icon: StrategyIcon },
    ]
  },
  { nm: "Platforms", items: [
      { nm: "PC", Icon: PCIcon },
      { nm: "PlayStation 5", Icon: PlaystationIcon },
      { nm: "Xbox Series X|S", Icon: XboxIcon },
      { nm: "Switch", Icon: SwitchIcon },
    ]
  },
];
