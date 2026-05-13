// app/action.ts
"use server";
export async function PingMessage() {
  console.log("ping action called");
  return { pong: true };
}