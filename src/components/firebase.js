
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

export function testDatabase() {
  console.log(FirebaseApp);
}

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

// async/await -> try/catch
export async function getItemsFromAPI() {
  try {
    // 1. Necesito conectarme a la colección de "productos" con "collection"
    const collectionProducts = collection(DB, "products");

    // 2. Necesito traer todos los documentos existentes con getDocs
    let respuesta = await getDocs(collectionProducts);

    // 3. Extramos la data de nuestros productos y la mapeamos con "map"
    const products = respuesta.docs.map((docu) => {
      return {
        ...docu.data(),
        id: docu.id,
      };
    });

    // 4. Retornamos el listado de productos mapeado
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


export async function exportItemsToFirestore() {
  const items = [
    {
      id: 1,
      nombre: "Arandano",
      precio: 50,
      categoria: "fruta",
      thumbnail: "/img/img1.png",
      count:2,
      stock: 10
    },
    {
      id: 2,
      nombre: "Frutilla",
      precio: 60,
      categoria: "fruta",
      thumbnail: "/img/img2.png",
      stock: 10
    },
    {
      id: 3,
      nombre: "Acelga",
      precio: 70,
      categoria: "fruta",
      thumbnail: "/img/img3.png",
      stock: 10
    },
    {
      id: 4,
      nombre: "Esparrago",
      precio: 80,
      categoria: "verdura",
      thumbnail: "/img/img4.png",
      stock: 10
    },
    {
      id: 5,
      nombre: "Brocoli",
      precio: 90,
      categoria: "verdura",
      thumbnail: "/img/img5.png",
      stock: 10
    },
    {
      id: 6,
      nombre: "Coliflor",
      precio: 100,
      categoria: "verdura",
      thumbnail: "/img/img6.png",
      stock: 10
    },
  ];

  const collectionRef = collection(DB, "products");


  for (let item of items) {
    item.index = item.id;
    delete item.id;
    const docRef = await addDoc(collectionRef, item);
    console.log("Document created with ID", docRef.id);
  }
}




