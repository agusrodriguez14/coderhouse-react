const itemsDB = [
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

export default function getItemsFromAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(itemsDB);
    }, 500);
  });
}

export function getSingleItemFromAPI(idParams) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let itemRequested = itemsDB.find((item) => item.id === Number(idParams));

      if (itemRequested) {
        resolve(itemRequested);
      } else {
        reject(new Error("El item no existe."));
      }
    }, 500);
  });
}

export function getItemsFromAPIByCategory(categoryid) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let itemsRequested = itemsDB.filter(
        (item) => item.categoria === categoryid
      );
      resolve(itemsRequested);
    }, 500);
  });
}
