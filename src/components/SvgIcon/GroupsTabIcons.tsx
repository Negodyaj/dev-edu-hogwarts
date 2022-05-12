import { SvgCake } from './SvgFiles/GroupsIcons/SvgCake';
import { SvgCookie } from './SvgFiles/GroupsIcons/SvgCookie';
import { SvgGift } from './SvgFiles/GroupsIcons/SvgGift';
import { SvgPlanet } from './SvgFiles/GroupsIcons/SvgPlanet';
import { SvgStar } from './SvgFiles/GroupsIcons/SvgStar';
import { SvgSun } from './SvgFiles/GroupsIcons/SvgSun';
import { SvgCoffeeToGo } from './SvgFiles/GroupsIcons/SvgCoffeeToGo';
import { SvgCoffee } from './SvgFiles/GroupsIcons/SvgCoffee';
import { SvgRainbow } from './SvgFiles/GroupsIcons/SvgRainbow';
import { SvgMoon } from './SvgFiles/GroupsIcons/SvgMoon';

export enum GroupsIcon {
  Cookie,
  Cake,
  Gift,
  Planet,
  Star,
  Sun,
  CoffeeToGo,
  Coffee,
  Rainbow,
  Moon,
}

export type SvgIconProps = {
  icon: GroupsIcon;
};

export const GroupsSvgIcon = (props: SvgIconProps) => {
  switch (props.icon) {
    case GroupsIcon.Cake:
      return <SvgCake />;
    case GroupsIcon.Cookie:
      return <SvgCookie />;
    case GroupsIcon.Gift:
      return <SvgGift />;
    case GroupsIcon.Planet:
      return <SvgPlanet />;
    case GroupsIcon.Star:
      return <SvgStar />;
    case GroupsIcon.Sun:
      return <SvgSun />;
    case GroupsIcon.CoffeeToGo:
      return <SvgCoffeeToGo />;
    case GroupsIcon.Coffee:
      return <SvgCoffee />;
    case GroupsIcon.Rainbow:
      return <SvgRainbow />;
    case GroupsIcon.Moon:
      return <SvgMoon />;
    default:
      return <></>;
  }
};

export const GroupsTabIcons = [
  GroupsIcon.Cake,
  GroupsIcon.Cookie,
  GroupsIcon.Planet,
  GroupsIcon.Gift,
  GroupsIcon.Sun,
  GroupsIcon.CoffeeToGo,
  GroupsIcon.Coffee,
  GroupsIcon.Rainbow,
  GroupsIcon.Star,
  GroupsIcon.Moon,
];
