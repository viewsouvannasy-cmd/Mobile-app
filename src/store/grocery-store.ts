import { create } from "zustand";

export type GroceryCategory =
  "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";

export interface GroceryItem {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
}

export interface CreateItemInput {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
}

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = { item: GroceryItem };

interface GroceryStore {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string, purchased: boolean) => Promise<void>;
  removeItem: (is: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
}

const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch("/api/items");
      const payload = (await res.json()) as ItemsResponse;

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      set({ items: payload.items });
    } catch (error) {
      console.log(`loading item error ${error}`);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (input) => {
    set({ error: null });
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "/application/json" },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: Math.max(1, input.quantity),
          priority: input.priority,
        }),
      });

      const payload = (await res.json()) as ItemResponse;

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      set((state) => ({ items: [payload.item, ...state.items] }));
      return payload.item;
    } catch (error) {
      console.log(`add item error ${error}`);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (id, quantity) => {
    const nextQuantity = Math.max(1, quantity);
    set({ error: null });
    try {
      const res = await fetch(`/api/items/update/quantity/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: nextQuantity,
        }),
      });

      const payload = (await res.json()) as ItemResponse;

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      }));
    } catch (error) {
      console.log(`update quantity error`);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  togglePurchased: async (id, purchased) => {
    set({ error: null });
    try {
      const res = await fetch(`/api/items/update/purchased/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchased: purchased,
        }),
      });

      const payload = (await res.json()) as ItemResponse;

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      }));
    } catch (error) {
      console.log(`loading item error ${error}`);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (id) => {
    set({ error: null });
    try {
      const res = await fetch(`/api/items/delete/${id}`, { method: "DELETE" });

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
    } catch (error) {
      console.log(`loading item error ${error}`);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },

  clearPurchased: async () => {
    set({ error: null });
    try {
      const res = await fetch(`/api/items/clear-purchased`, { method: "POST" });

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      set((state) => ({
        items: state.items.filter((item) => item.purchased !== true),
      }));
    } catch (error) {
      console.log(`loading item error ${error}`);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useGroceryStore;
