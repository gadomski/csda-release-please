import * as core from "@actions/core";
import * as github from "@actions/github";
import { Manifest, GitHub } from "release-please";
import { registerCsdaReleaseStrategy } from "./csda-release-strategy.js";

async function run(): Promise<void> {
  try {
    await registerCsdaReleaseStrategy();

    const token = core.getInput("token", { required: true });
    const configFile = core.getInput("config-file");
    const manifestFile = core.getInput("manifest-file");

    const gh = await GitHub.create({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      token,
    });

    const manifest = await Manifest.fromManifest(
      gh,
      gh.repository.defaultBranch,
      configFile,
      manifestFile,
    );

    const pullRequests = await manifest.createPullRequests();

    const prs = pullRequests.filter(
      (pr): pr is NonNullable<typeof pr> => pr !== undefined,
    );

    if (prs.length > 0) {
      core.setOutput("prs_created", "true");
      core.setOutput("pr", JSON.stringify(prs.map((pr) => pr.number)));
    } else {
      core.setOutput("prs_created", "false");
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed("An unexpected error occurred");
    }
  }
}

run();
