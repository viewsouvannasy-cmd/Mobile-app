import { desc, eq } from "drizzle-orm";
import { db } from "./client";
import { groceryItem } from "./schema";

export const listGroceryItmes = async () => {
  const rows = await db
    .select()
    .from(groceryItem)
    .orderBy(desc(groceryItem.updated_at));

  return rows;
};

export const createGroceryItem = async (input: {
  name: string;
  category: string;
  quantity: number;
  priority: string;
}) => {
  const row = await db
    .insert(groceryItem)
    .values({
      id: crypto.randomUUID(),
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity),
      priority: input.priority,
      updated_at: Date.now(),
    })
    .returning();

  return row[0];
};

export const setGroceryItemPurchased = async (
  id: string,
  purchased: boolean,
) => {
  const row = await db
    .update(groceryItem)
    .set({ purchased, updated_at: Date.now() })
    .where(eq(groceryItem.id, id))
    .returning();

  if (row.length === 0) {
    return;
  }

  return row[0];
};

export const updateGroceryItemQuantity = async (
  id: string,
  quantity: number,
) => {
  const row = await db
    .update(groceryItem)
    .set({
      quantity: Math.max(1, Math.floor(quantity)),
      updated_at: Date.now(),
    })
    .where(eq(groceryItem.id, id))
    .returning();

  if (row.length === 0) {
    return;
  }

  return row[0];
};

export const deleteGroceryItems = async (id: string) => {
  await db.delete(groceryItem).where(eq(groceryItem.id, id));
};

export const clearGroceryItems = async () => {
  await db.delete(groceryItem).where(eq(groceryItem.purchased, true));
};
