import * as core from "@actions/core";
import { getIssueContent } from "./getIssueContent";
import { checkKeywords } from "./checkKeywords";
import { setIssueAssignee } from "./setIssueAssignee";

async function run() {
  try {
    core.setOutput("assigned", false.toString());
    const titleOrBody: string = core.getInput("title-or-body");
    const token = core.getInput("github-token");
    const content = await getIssueContent(token, titleOrBody);
    const parameters: {assignees: string[] }[] = JSON.parse(
      core.getInput("parameters", {required: true})
    );
    if (!parameters) {
      core.setFailed(
        `parameters input not found. Make sure your ".yml" file contains a "parameters" JSON array like this:
        parameters: '[ {"assignees": ["username"]}]`
      );
    }

    const matchingKeywords = checkKeywords(parameters, content);

    if (matchingKeywords === null) {
      console.log("Keywords not included in this issue");
      return;
    } else {
      setIssueAssignee(token, matchingKeywords);
      core.setOutput("assigned", true.toString());
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
