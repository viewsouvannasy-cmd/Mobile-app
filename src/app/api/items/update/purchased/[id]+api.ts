import { setGroceryItemPurchased } from "@/lib/server/db-action";

export async function PATCH(req: Request, { id }: { id: string }) {
  try {
    const body = await req.json();
    const { purchased } = body;

    const item = await setGroceryItemPurchased(id, purchased);

    return Response.json({ ok: true, item }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, msg: error }, { status: 500 });
  }
}
