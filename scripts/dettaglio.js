// devo targhettare adesso la query dell'id per le pagine di dettaglio arrivando con l'id
// del prodotto su cui ho cliccato dettaglio
// targhetto la mia query sempre con window location search e url search

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);
// targhetto il container del mio dettaglio
const container = document.getElementById("productDetail");

// creo di nuovo le costanti per le api
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODc2MDNlNmE4OWI0ZDAwMTU0MDI1MTUiLCJpYXQiOjE3NTI1NjQ3MTAsImV4cCI6MTc1Mzc3NDMxMH0.d-jKx1F-XMSDKlWPhEADEMsr1tKvxAm0oexTrngf8Bc";

//   adesso devo fetchare per fare un get del prodotto stesso tramite id e caricarlo
//  nella pagina di dettaglio nell'endpoint aggiungo l'id

fetch(endpoint + id, {
  headers: {
    Authorization: apiKey,
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Errore nel caricamento dati");
    }
  })
  .then((data) => {
    document.title = `Music Zone - ${data.name}`;
    container.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.imageUrl}" class="img-fluid" />
      <p>${data.description}</p>
      <p><strong>Prezzo:</strong> €${data.price}</p>
    `;
  })
  .catch(() => {
    container.innerHTML = `
      <div class="alert alert-danger">Errore nel caricamento del prodotto.</div>
    `;
  });
