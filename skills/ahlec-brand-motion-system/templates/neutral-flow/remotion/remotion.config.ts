import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(1);
Config.setChromiumOpenGlRenderer("swangle"); // software GL: deterministic frames (ANGLE dropped layers on some frames)
