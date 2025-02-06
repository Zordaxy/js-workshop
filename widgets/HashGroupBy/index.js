const endorsements = [
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
];
const skills = [];

function convertToSkills(endorsements) {
  const map = new Map();
  endorsements.forEach((entry) => {
    if (map.has(entry.skill)) {
      map.get(entry.skill).push(entry.user);
    } else {
      map.set(entry.skill, [entry.user]);
    }
  });

  const result = Array.from(map, ([skill, users]) => {
    return { skill, users, count: users.length };
  });
  result.sort((a, b) => b.count - a.count);

  return result;
}

skills.push(...convertToSkills(endorsements));

// Result
console.log(skills);
// [
//   { skill: 'javascript', users: ['Chad', 'Bill', 'Sue'], count: 3 },
//   { skill: 'css', users: ['Bill', 'Sue'], count: 2 },
//   { skill: 'html', users: ['Sue'], count: 1 },
// ]
