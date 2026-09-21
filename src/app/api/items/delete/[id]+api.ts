import { deleteGroceryItems } from "@/lib/server/db-action";

export async function DELETE(_req: Request, { id }: { id: string }) {
  try {
    await deleteGroceryItems(id);

    return Response.json({ ok: true, msg: "delete sucess" }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, msg: error }, { status: 500 });
  }
}
