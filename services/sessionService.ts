export const sessionService = {
  session: async () => {
    try {
        const response = await fetch("/api/session", { cache: "no-store" });
        return await response.json();
    } catch (error) {
      console.log("Session error:", error);
      return { isAuthenticated: false };
    }
  },
};
