// Load Categroy Function Call with api  =============
const loadCategory = async () => {
  const url = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const res = await url.json();
  displayCategory(res.data.news_category);
};
// Load Categroy Function Start Here========
const displayCategory = (data) => {
  const categoryContiner = document.getElementById("category-container");

  data.forEach((element) => {
    const nav = document.createElement("nav");
    nav.innerHTML = `
    <a onclick="newsCategory('${element.category_id}')" class="nav-link active bg-white mx-2 my-2 rounded shadow-sm" aria-current="page" href="#"> ${element.category_name} </a>
    `;
    categoryContiner.appendChild(nav);
  });
};
// Load Category Function End Here========

// Category Link api and function call here ====
const newsCategory = async (id) => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  newsBox(data.data);
};
// Category news function start Here (box) =======
const newsBox = async (data) => {
  const mainContainer = document.getElementById("main-container");
  mainContainer.textContent = "";

  //items =====
  const items = document.getElementById("items");
  items.innerText = `${data.length} News Found `;

  data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mb-3 shadow-sm w100"  data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getId('${
      element._id
    }')">
    <div class="row g-0">
    <div class="col-md-4 p-1">
      <img
        src="${element.image_url}"
        class="img-fluid rounded-start"
        alt="..."
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title text-dark fw-semibold">${element.title}</h5>
        <p class="card-text ellipsis text-secondary">${element.details} </p>

        <div class="bg-light rounded d-flex justify-content-between">
          <!-- Author Box start -->
          <div class="d-flex align-items-center">
            <div class="p-2">
              <img
                class="rounded-circle"
                width="50px"
                src="${element.author.img}"
                alt=""
              />
            </div>
            <div class="d-flex align-items-cente flex-column">
              <span>${
                element.author.name ? element.author.name : "No Data Found"
              }</span>
              <span>${
                element.author.published_date
                  ? element.author.published_date
                  : "No Data Found"
              }</span>
            </div>
          </div>
          <!-- Author Box end -->

          <!-- Views Box start -->
          <div class="d-flex align-items-center">
            <span><i class="fa-regular fa-eye mx-2"></i></span>
            <span>${
              element.total_view ? element.total_view : "0"
            }<strong>M</strong></span>
          </div>
          <!-- Views Box end -->

          <!-- Arrow start  -->
          <div class="d-flex align-items-center">
            <i class="fa-solid fa-arrow-right mx-4"></i>
          </div>
          <!-- Arrow End  -->
        </div>
      </div>
    </div>
  </div>
  </div>
    `;
    mainContainer.appendChild(div);
  });
  toggleSpinner(false);
};

//Spinner Function ==========
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spanner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// Modal Section ======

const getId = async (getNews) => {
  const url = `https://openapi.programming-hero.com/api/news/${getNews}`;
  const res = await fetch(url);
  const data = await res.json();
  modalData(data.data);
};

const modalData = (getData) => {
  const modalTitle = document.getElementById("exampleModalLabel");
  const modalBody = document.getElementById("modal-body");
  getData.forEach((element) => {
    modalTitle.innerHTML = `
    <h5>${element.title}</h5>
    `;
    modalBody.innerHTML = `
    <img src='${element.thumbnail_url}' />
    <h4>Total Views: ${element.total_view}M</h4>
    <p><strong>Details:</strong> ${element.details} </p>
    `;
  });
};

loadCategory();
