// devo fare in modo che i miei prodotti divisi per descrizione finiscano nella
// descrizione giusta. Per farlo devo targhettare la query della descrizione cercando
// nell'url

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const description = urlParams.get("description");
  // targhetto lo spinner
  const spinner = document.getElementById("spinner");
  // gli do inline block per farlo apparire
  spinner.style.display = "inline-block";

  //   adesso targhetto la row e il container su cui andranno le mie card coi prodotti
  const container = document.querySelector(".container .row");
  // targhetto la box dove andranno eventuali errori
  const errorBox = document.getElementById("errorBox");
  // targhetto l'h1 che cambierà i base ai prodotti aperti
  const h1 = document.getElementById("products");

  // metto in una variabile l'url dell'API
  const api = "https://striveschool-api.herokuapp.com/api/product/";
  const key =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODc2MDNlNmE4OWI0ZDAwMTU0MDI1MTUiLCJpYXQiOjE3NTI1NjQ3MTAsImV4cCI6MTc1Mzc3NDMxMH0.d-jKx1F-XMSDKlWPhEADEMsr1tKvxAm0oexTrngf8Bc";

  //   ora fectcho per il get
  fetch(api, {
    headers: { Authorization: key },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel Caricamento");
      }
    })
    // adesso se la chiamata arriva a buon fine devo filtrare per descrizione e inserire
    // al posto giusto
    .then((products) => {
      // console loggo tutti i prodotti per avere un quadro chiaro
      console.log("Tutti i prodotti:", products);

      // nel momento in cui è tutto caricato faccio sparire lo spinner
      spinner.style.display = "none";
      //    questi saranno i miei prodotti filtrati

      const filtered = products.filter(function (product) {
        return product.description === description;
        //  mi tornano tutti i prodotti che hanno la descrizione uguale alla query
      });
      //   se non ci sono prodotti nell'array dei filtrati allora inserisco un messaggio
      //  per avvisare l'utente
      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-white">Nessun prodotto trovato per la descrizione "${description}"</p>`;
        return;
      }
      //   adesso ciclo tutti i prodotti di filtered per creare le card corrispondenti
      filtered.forEach(function (product) {
        // creo la colonna
        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-4"); //

        // creo la card
        col.innerHTML = `
           <div class="card h-100">
            <img src="${product.imageUrl}" class="card-img-top" />
            <div class="card-body bg-cards">
              <h5 class="card-title text-light">${product.name}</h5>
              <p class="card-text text-light">${product.description}</p>
              <p class="fw-bold text-light">${product.price} €</p>
              <a href="./dettaglio.html?id=${product._id}" class="btn btn-sm btn-outline-info">Dettaglio</a>
              <a href="./backoffice.html?id=${product._id}" class="btn btn-sm btn-outline-warning">Modifica</a>
            </div>
          </div>
        `;
        h1.innerText = product.description;
        // cosi cambio anche il titolo della tab
        document.title = `Music Zone - ${product.description}`;
        // appendo la card al container
        container.appendChild(col);
      });
    })
    .catch((err) => {
      console.log("Errore nel caricamento dei prodotti", err);
      spinner.style.display = "none";
      errorBox.innerHTML =
        "<p class='text-danger'>Errore nel caricamento dei prodotti.</p>";
    });
});
