import { getGroceryItmes } from "@/server/db-action";

export async function GET() {
  try {
    const results = await getGroceryItmes();

    return Response.json({ ok: true, results }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, error }, { status: 500 });
  }
}
