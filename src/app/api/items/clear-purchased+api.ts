import { clearGroceryItems } from "@/lib/server/db-action";

export async function POST() {
  try {
    await clearGroceryItems();

    return Response.json({ ok: true, msg: "clear succcess" }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, msg: error }, { status: 500 });
  }
}
