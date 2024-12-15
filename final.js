import jsonfile from "jsonfile";
import { execSync } from "child_process";

// Create commits with exact GitHub requirements
const createFinalCommits = () => {
  const dates = [
    "2024-12-15", "2024-12-10", "2024-12-05", "2024-11-25", "2024-11-20",
    "2024-11-15", "2024-11-10", "2024-10-25", "2024-10-20", "2024-10-15",
    "2024-09-25", "2024-09-20", "2024-09-15", "2024-08-25", "2024-08-20"
  ];
  
  dates.forEach((date, index) => {
    // Create unique content
    const data = {
      date: date,
      index: index,
      timestamp: Date.now(),
      content: `Final contribution for ${date}`
    };
    
    // Write file
    jsonfile.writeFileSync("./data.json", data);
    
    // Git commands with specific formatting
    execSync("git add .", { stdio: 'inherit' });
    execSync(`git commit -m "Contribution ${date}" --date="${date}T12:00:00"`, { stdio: 'inherit' });
    
    console.log(`✅ Created commit for ${date}`);
  });
  
  // Push all commits
  console.log("🚀 Pushing all commits to GitHub...");
  execSync("git push", { stdio: 'inherit' });
  console.log("✅ All commits pushed successfully!");
  console.log("\n📋 Important GitHub Contribution Requirements:");
  console.log("1. Email must be verified in GitHub settings");
  console.log("2. Commits may take up to 24 hours to appear");
  console.log("3. Check Settings > Emails in GitHub to verify your email");
  console.log("4. Make sure 'Include private contributions' is enabled in profile settings");
};

createFinalCommits(); 