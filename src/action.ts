import * as core from "@actions/core";
import { main } from "../release-please-action/src/index.js";
import { registerCsdaReleaseStrategy } from "./csda-release-strategy.js";

registerCsdaReleaseStrategy()
  .then(() => main())
  .catch((err) => {
    core.setFailed(`release-please failed: ${err.message}`);
  });
