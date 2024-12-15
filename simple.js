import jsonfile from "jsonfile";
import simpleGit from "simple-git";

const git = simpleGit();

// Create 10 test commits for recent dates in 2024
const createTestCommits = async () => {
  const dates = [
    "2024-12-01", "2024-11-01", "2024-10-01", "2024-09-01", "2024-08-01",
    "2024-07-01", "2024-06-01", "2024-05-01", "2024-04-01", "2024-03-01"
  ];
  
  for (const date of dates) {
    const data = {
      date: date,
      test: true,
      timestamp: Date.now(),
      random: Math.random()
    };
    
    await jsonfile.writeFile("./data.json", data);
    await git.add("./data.json");
    await git.commit(`Test commit for ${date}`, {"--date": `${date}T12:00:00`});
    console.log(`Created test commit for ${date}`);
  }
  
  await git.push();
  console.log("Test commits pushed to GitHub!");
};

createTestCommits().catch(console.error); 