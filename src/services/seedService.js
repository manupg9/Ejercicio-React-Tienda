import { addDoc, collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase";
import seedProductos from "../data/seedProductos";

export async function seedProductosEnFirestore() {
  const col = collection(db, "productos");

  // Evita duplicados: si ya hay 1 producto, no sube nada
  const q = query(col, limit(1));
  const snap = await getDocs(q);

  if (!snap.empty) {
    return { ok: false, message: "Ya hay productos en Firestore. No se ha subido nada." };
  }

  for (const p of seedProductos) {
    await addDoc(col, p);
  }

  return { ok: true, message: "✅ Productos subidos correctamente (10)." };
}
