export const disconnectToUser = async (username: string) => {
  const res = await fetch("http://localhost:3000/api/disconnect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
    }),
  });

  return res;
};
