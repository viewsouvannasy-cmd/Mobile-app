import { updateGroceryItemQuantity } from "@/lib/server/db-action";

export async function PATCH(req: Request, { id }: { id: string }) {
  try {
    const body = await req.json();
    const { quantity } = body;

    const item = await updateGroceryItemQuantity(id, quantity);
    return Response.json({ ok: true, item }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, msg: error }, { status: 500 });
  }
}
