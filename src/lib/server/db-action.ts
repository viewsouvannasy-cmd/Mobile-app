import sql from "./db";

export const getGroceryItmes = async () => {
  const rows = await sql`
    SELECT 
    * 
    FROM grocery_items
    `;

  return rows;
};

export const createGroceryItem = async (input: {
  name: string;
  category: string;
  quantity: number;
  priority: string;
}) => {
  const row = await sql`
    INSER INTO grocery_items (id, name , category , quantity , purchased , priority , update_at)
    VALUES (
    ${crypto.randomUUID()},
    ${input.name},
    ${input.category},
    ${input.priority},
    ${Date.now()}
    )
  `;

  return row[0];
};

export const setGroceryItemPurchased = async (
  id: string,
  purchased: boolean,
) => {
  const row = await sql`
  UPDATE grocery_items
  SET purchased = ${purchased}
  WHERE id = ${id}
  RETURNING *
  `;

  if (row.length === 0) {
    return;
  }

  return row[0];
};

export const updateGroceryItemQuantity = async (
  id: string,
  quantity: number,
) => {
  const row = await sql`
    UPDATE grocery_items 
    SET quantity = ${quantity}
    WHERE id = ${id}
    RETURNING *
  `;
  if (row.length === 0) {
    return;
  }

  return row[0];
};

export const deleteGroceryItems = async (id: string) => {
  await sql`
  DELETE FROM grocery_items 
  WHERE id = ${id}
  `;
};

export const clearGroceryItems = async () => {
  await sql`
  DELETE FROM grocery_items 
  WHERE purchased = ${true}
  `;
};
