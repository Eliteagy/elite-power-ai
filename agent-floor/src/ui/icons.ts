// Phosphor icons (regular weight), inlined as SVG strings at build time.
import x from '@phosphor-icons/core/assets/regular/x.svg?raw';
import sun from '@phosphor-icons/core/assets/regular/sun.svg?raw';
import moon from '@phosphor-icons/core/assets/regular/moon.svg?raw';
import plug from '@phosphor-icons/core/assets/regular/plug.svg?raw';
import cornersOut from '@phosphor-icons/core/assets/regular/corners-out.svg?raw';
import copy from '@phosphor-icons/core/assets/regular/copy.svg?raw';
import check from '@phosphor-icons/core/assets/regular/check.svg?raw';
import play from '@phosphor-icons/core/assets/regular/play.svg?raw';
import github from '@phosphor-icons/core/assets/regular/github-logo.svg?raw';
import crosshair from '@phosphor-icons/core/assets/regular/crosshair.svg?raw';
import building from '@phosphor-icons/core/assets/regular/building-office.svg?raw';
import send from '@phosphor-icons/core/assets/regular/paper-plane-tilt.svg?raw';
import stop from '@phosphor-icons/core/assets/regular/stop.svg?raw';
import robot from '@phosphor-icons/core/assets/regular/robot.svg?raw';
import compass from '@phosphor-icons/core/assets/regular/compass.svg?raw';
import arrowSquareOut from '@phosphor-icons/core/assets/regular/arrow-square-out.svg?raw';
import pushPin from '@phosphor-icons/core/assets/regular/push-pin.svg?raw';
import folderSimple from '@phosphor-icons/core/assets/regular/folder-simple.svg?raw';
import fileText from '@phosphor-icons/core/assets/regular/file-text.svg?raw';
import columns from '@phosphor-icons/core/assets/regular/columns.svg?raw';
import microphone from '@phosphor-icons/core/assets/regular/microphone.svg?raw';
import microphoneFill from '@phosphor-icons/core/assets/fill/microphone-fill.svg?raw';
import lockOpen from '@phosphor-icons/core/assets/regular/lock-simple-open.svg?raw';
import robotFill from '@phosphor-icons/core/assets/fill/robot-fill.svg?raw';
import columnsFill from '@phosphor-icons/core/assets/fill/columns-fill.svg?raw';
import compassFill from '@phosphor-icons/core/assets/fill/compass-fill.svg?raw';

export const icons = { x, sun, moon, plug, cornersOut, copy, check, play, github, crosshair, building, send, stop, robot, compass, arrowSquareOut, pushPin, folderSimple, fileText, columns, robotFill, columnsFill, compassFill, microphone, microphoneFill, lockOpen };
export type IconName = keyof typeof icons;

export function icon(name: IconName) {
  return icons[name].replace('<svg ', '<svg aria-hidden="true" focusable="false" class="icon" ');
}
