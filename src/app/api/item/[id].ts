import {
  deleteGroceryItems,
  updateGroceryItemQuantity,
} from "@/server/db-action";

export async function PATCH(req: Request, { id }: { id: string }) {
  try {
    const body = await req.json();
    const { quantity } = body;

    await updateGroceryItemQuantity(id, quantity);
    return Response.json({ ok: true, msg: "update  sucess" }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, msg: error }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { id }: { id: string }) {
  try {
    await deleteGroceryItems(id);

    return Response.json({ ok: true, msg: "delete sucess" }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, msg: error }, { status: 500 });
  }
}
