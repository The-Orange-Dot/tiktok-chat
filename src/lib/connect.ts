export const connectToUser = async (username: string) => {
  const res = await fetch("http://localhost:3000/api/connect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
    }),
  });

  return res;
};
