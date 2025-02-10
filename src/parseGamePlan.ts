type GamePlan = string[][];

const parseGamePlan = (gamePlan: string): GamePlan => {
  const out = [];

  // Split by line (\r\n or \n)
  const lines = gamePlan.split(/\r\n|\n/);

  // Split by space, unless "in quotes"
  for (const line of lines) {
    const parts = (line.match(/(?:[^\s"]+|"([^"]*)")/g) || []).map(part => part.replace(/^"|"$/g, ""));

    // Remove anything past comments (//)
    const commentIndex = parts.findIndex(part => part.startsWith("//"));
    if (commentIndex != -1) {
      parts.splice(commentIndex);
    }

    if (parts.length > 0) {
      out.push(parts.map((part) => part.replace(/"/g, "")));
    }
  }

  return out || [];
}

export { type GamePlan, parseGamePlan };
