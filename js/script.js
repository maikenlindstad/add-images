const form = document.querySelector("form");
const button = document.querySelector("button");
const title = document.querySelector("#title");
const imagePicker = document.querySelector("#imagePicker");
const url = "https://pawn-api.herokuapp.com/api/products";
const productList = document.querySelector(".get-products");

async function getProducts() {

  // fetch
  const response = await fetch(url);
  const results = await response.json();
  const products = results.data;

  for (let i = 0; i < products.length; i++) {

    console.log(products[i].attributes.title);
    productList.innerHTML += `
    <h1>${products[i].attributes.title}</h1>`;

  }

}

getProducts();

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {

  event.preventDefault();

  const formData = new FormData();

  // check if there any files first
  if (imagePicker.files.length === 0) {
    return alert("Select an image");
  }

  // get the file
  const file = imagePicker.files[0];

  // other, non-file inputs, you would add to this object
  const data = { title: title.value };
  formData.append("files.image", file, file.name);
  formData.append("data", JSON.stringify(data));

  const options = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    console.log(response);
  }

  catch (error) {
    console.log(error);
  }

}