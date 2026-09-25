import { createGroceryItem, getGroceryItmes } from "@/lib/server/db-action";

export async function GET() {
  try {
    const items = await getGroceryItmes();

    return Response.json({ ok: true, items }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, msg: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, category, quantity, priority } = body;

    if (!name || !category || !priority) {
      return Response.json(
        { ok: false, msg: "Please provide all require" },
        { status: 400 },
      );
    }

    const item = await createGroceryItem({
      name,
      category,
      quantity,
      priority,
    });

    return Response.json({ ok: true, item }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, msg: error }, { status: 500 });
  }
}
