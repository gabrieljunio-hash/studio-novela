import React from "react";
import { Composition } from "remotion";
import { PovPrototype } from "./Prototype";

export const Root: React.FC = () => (
  <Composition
    id="PovPrototype"
    component={PovPrototype}
    durationInFrames={2700}
    fps={30}
    width={1080}
    height={1920}
  />
);
