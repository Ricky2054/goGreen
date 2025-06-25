import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";
import fs from "fs";

const git = simpleGit();

const makeCommit = async (date) => {
  const data = {
    date: date,
    timestamp: Date.now(),
    random: Math.random(),
    message: `Contribution for ${date}`
  };
  
  // Write unique data
  await jsonfile.writeFile("./data.json", data);
  
  // Add and commit with specific date
  await git.add("./data.json");
  await git.commit(date, {"--date": date});
  
  console.log(`Created commit for: ${date}`);
};

const generateCommits = async () => {
  const commits = [];
  
  // Generate 365 commits for 2024 (one for each day)
  for (let i = 0; i < 365; i++) {
    const date = moment("2024-01-01").add(i, 'days').format("YYYY-MM-DD");
    commits.push(date);
  }
  
  // Shuffle the dates for random distribution
  for (let i = commits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [commits[i], commits[j]] = [commits[j], commits[i]];
  }
  
  // Create commits for each date
  for (const date of commits) {
    await makeCommit(date);
    // Small delay to avoid issues
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Push all commits
  console.log("Pushing all commits to GitHub...");
  await git.push();
  console.log("All commits pushed successfully!");
};

generateCommits().catch(console.error);
