import { createGroceryItem, getGroceryItmes } from "@/server/db-action";

export async function GET() {
  try {
    const results = await getGroceryItmes();

    return Response.json({ ok: true, results }, { status: 200 });
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
        { ok: false, msg: "Please provide all require " },
        { status: 400 },
      );
    }

    const results = await createGroceryItem({
      name,
      category,
      quantity,
      priority,
    });
    return Response.json({ ok: true, results }, { status: 200 });
  } catch (error) {
    return Response.json({ ok: false, msg: error }, { status: 500 });
  }
}
