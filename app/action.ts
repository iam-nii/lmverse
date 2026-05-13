// app/action.ts
"use server";
export async function ping() {
  console.log("ping action called");
  return { pong: true };
}