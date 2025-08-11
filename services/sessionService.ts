export const sessionService = {
  session: async () => {
    try {
      const response = await fetch("/api/session", { cache: "no-store" });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
