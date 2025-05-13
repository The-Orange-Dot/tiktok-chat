export const connectToUser = async (username: string) => {
  const res = await fetch("/api/connect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
    }),
  });

  return res;
};
