const loadCategory = async () => {
  const url = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const res = await url.json();
  displayCategory(res.data.news_category);
};

const displayCategory = (data) => {
  const categoryContiner = document.getElementById("category-container");

  data.forEach((element) => {
    const nav = document.createElement("nav");
    nav.innerHTML = `
    <a class="nav-link active bg-white mx-2 my-2 rounded shadow-sm" aria-current="page" href="#"> ${element.category_name} </a>
    `;
    categoryContiner.appendChild(nav);
  });
};

loadCategory();
