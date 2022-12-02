
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  addDoc,
  writeBatch,
  documentId,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3Eq38htWzthBveu9ARH43kwYh9sR7Ue8",
  authDomain: "react-rodriguez.firebaseapp.com",
  projectId: "react-rodriguez",
  storageBucket: "react-rodriguez.appspot.com",
  messagingSenderId: "180680192766",
  appId: "1:180680192766:web:87abe0db923708afa8abaf"
};

const FirebaseApp = initializeApp(firebaseConfig);
const DB = getFirestore(FirebaseApp);

export async function getSingleItemFromAPI(id) {
  // 1. Referenciamos el documento que queremos con su ID y su Colección
  const docRef = doc(DB, "products", id);

  // 2. Obtenemos el snapshot del documento con getDoc(referenciaDoc)
  const docSnap = await getDoc(docRef);

  // 3. Chequeamos si el snapshot existe con snapshot.exists()
  if (docSnap.exists()) {
    // 4. Retornamos los datos
    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  } else {
    console.error("El producto no existe");
  }
}
export async function getOrderFromAPI(id) {
  const docRef = doc(DB, "buyorders", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      orderid: docSnap.id,
    };
  } else {
    console.error("La Orden no existe");
  }
}

export async function getItemsFromAPI() {
  try {
    const collectionProducts = collection(DB, "products");
    let respuesta = await getDocs(collectionProducts);
    const products = respuesta.docs.map((docu) => {
      return {
        ...docu.data(),
        id: docu.id,
      };
    });

    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function getItemsFromAPIByCategory(categoryId) {
  const productsRef = collection(DB, "products");
  const myQuery = query(productsRef, where("categoria", "==", categoryId));
  const productsSnap = await getDocs(myQuery);
  const products = productsSnap.docs.map((docu) => {
    return {
      ...docu.data(),
      id: docu.id,
    };
  });

  return products;
}

export async function createBuyOrderFirestore(buyOrderData) {
  const collectionRef = collection(DB, "buyorders");
  const docRef = await addDoc(collectionRef, buyOrderData);

  return docRef.id;
}

export async function createBuyOrderFirestoreWithStock(buyOrderData) {
  const collectionProductsRef = collection(DB, "products");
  const collectionOrdersRef = collection(DB, "buyorders");
  const batch = writeBatch(DB);

  let arrayIds = buyOrderData.items.map((item) => {
    return item.id;
  });

  const q = query(collectionProductsRef, where(documentId(), "in", arrayIds));
  let productsSnapshot = await getDocs(q);

  productsSnapshot.docs.forEach((doc) => {
    let stockActual = doc.data().stock;
    let itemInCart = buyOrderData.items.find((item) => item.id === doc.id);
    let stockActualizado = stockActual - itemInCart.count;

    batch.update(doc.ref, { stock: stockActualizado });
  });

  const docOrderRef = doc(collectionOrdersRef);
  batch.set(docOrderRef, buyOrderData);
  batch.commit();

  return docOrderRef.id;
}

  



