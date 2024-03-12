import ky from "ky";

export const request = ky.create({
  retry: 0,
  prefixUrl: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  throwHttpErrors: true,
});
