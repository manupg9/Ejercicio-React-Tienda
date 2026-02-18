import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getProductos() {
  const snap = await getDocs(collection(db, "productos"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
