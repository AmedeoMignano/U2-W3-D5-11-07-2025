createYear();
// creo le variabili per l'API
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODc2MDNlNmE4OWI0ZDAwMTU0MDI1MTUiLCJpYXQiOjE3NTI1NjQ3MTAsImV4cCI6MTc1Mzc3NDMxMH0.d-jKx1F-XMSDKlWPhEADEMsr1tKvxAm0oexTrngf8Bc";

// targhetto i bottoni
const buttonReset = document.getElementById("reset-btn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const addProduct = document.getElementById("add-btn");

// creo una funzione al caricamento del DOM per targhettare il form del back office
// e postare sull'API
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bo-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // adesso creo un oggetto in cui vado a prendere tutti i valori del form
    // questo sarà il modello del nostro oggetto da mandare all'API

    const newProduct = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("imageUrl").value,
      price: parseFloat(document.getElementById("price").value),
    };

    console.log("Oggetto da inviare:", newProduct);
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(newProduct),
    })
      // dopo il fetch vediamo le risposte con then e in caso gli errori con catch.
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((text) => {
            throw new Error(`Errore nel caricamento: ${text}`);
          });
        }
      })
      // visualizzo il prodotto salvato
      .then((data) => {
        alert("Prodotto creato con successo!");
        console.log("Prodotto salvato:", data);
      })
      .catch((error) => {
        console.error("Errore durante la creazione del prodotto:", error);
      });
  });
});

// adesso ottimizziamo la logica per la modifica del prodotto
// se l'url del backoffice ha un id vorrà dire che siamo in modalità modifica

// targhetto la query per l'id

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// se non c'è l'id nascondo i bottoni update e delete dal backoffice
if (!id) {
  updateBtn.style.display = "none";
  deleteBtn.style.display = "none";
}
// mentre se c'è nascondo il bottone per aggiungere
if (id) {
  addProduct.style.display = "none";
}

// fetcho se c'è l'id in maniera tale da precompletare il form
if (id) {
  fetch(endpoint + id, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore caricamento dati da modificare");
      }
    })
    // in tal caso precompilo il form
    .then((data) => {
      document.getElementById("name").value = data.name;
      document.getElementById("description").value = data.description;
      document.getElementById("brand").value = data.brand;
      document.getElementById("imageUrl").value = data.imageUrl;
      document.getElementById("price").value = data.price;
    })
    .catch((err) => {
      console.error(err);
      // in caso aggiungo l'errore alla div box che ho creato
      document.getElementById("errorBox").innerHTML =
        "<div class='alert alert-danger'>Errore nel caricamento del prodotto.</div>";
    });
}

// ora implemento la logica per i vari bottoni
// parto dal bottone update

updateBtn.addEventListener("click", function () {
  // creo l'oggetto con gli update da fare nel put

  const updatedProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value),
  };
  // chiedo conferma per la modifica
  if (confirm("Sei sicuro di voler aggiornare questo prodotto?.")) {
    fetch(endpoint + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nell'aggiornamento");
        }
      })
      .then((data) => {
        alert("Prodotto aggiornato con successo!");
        console.log("Prodotto aggiornato:", data);
      })
      .catch((err) => {
        console.error(err);
        // in caso di errore aggiungo sempre l'errore al mio box
        document.getElementById("errorBox").innerHTML =
          "<div class='alert alert-danger'>Errore durante l'aggiornamento del prodotto.</div>";
      });
  }
});

// adesso facciamo la stessa cosa con il bottone delete
deleteBtn.addEventListener("click", function () {
  // chiedo conferma prima di procedere
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(endpoint + id, {
      method: "DELETE",
      headers: {
        Authorization: apiKey,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json(), alert("Prodotto eliminato con successo!");
          // a questo punto torno alla home perché ho eliminato l'elemento
          window.location.href = "./index.html";
        } else {
          throw new Error("Errore nell'eliminazione");
        }
      })
      .catch((err) => {
        console.error(err);
        // va sempre nella mia box l'errore
        document.getElementById("errorBox").innerHTML =
          "<div class='alert alert-danger'>Errore durante l'eliminazione del prodotto.</div>";
      });
  }
});

// creiamo adesso una conferma anche per il bottone di reset
buttonReset.addEventListener("click", function () {
  if (confirm("Sei sicuro di voler resettare tutti i campi del form")) {
  }
});
