let productsData = [
  {
    id:1,
    name:"Blue Amalgo",
    price:89,
    img:"https://assets.adidas.com/images/e_trim:EAEEEF/c_lpad,w_iw,h_ih/b_rgb:EAEEEF/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/e2f1dcbcac55451db75832945af363ae_9366/AMALGO_SHOES_Blue_IU6239_00_plp_standard.jpg"
  },
  {
    id:2,
    name:"Silver Amalgo",
    price:99,
    img:"https://assets.adidas.com/images/e_trim:EAEEEF/c_lpad,w_iw,h_ih/b_rgb:EAEEEF/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/bdf19a73f0094cdc8c7ee14e50b74d9b_9366/Amalgo_Shoes_Silver_JJ6465_00_plp_standard.jpg"
  },
  {
    id:3,
    name:"Black Amalgo",
    price:109,
    img:"https://assets.adidas.com/images/e_trim:EAEEEF/c_lpad,w_iw,h_ih/b_rgb:EAEEEF/w_180,f_auto,q_auto,fl_lossy,c_fill,g_auto/268d561c255d4f45b2d6f63d873cd079_9366/AMALGO_SHOES_Black_IU6241_00_plp_standard.jpg"
  }
];

let productsContainer = document.getElementById("products");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* SHOP PAGE */
if(productsContainer){
  productsData.forEach(p=>{
    productsContainer.innerHTML+=`
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add To Cart</button>
      </div>
    `;
  });
}

/* Add To Cart */
function addToCart(id){
  let item = productsData.find(p=>p.id===id);
  cart.push(item);
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount(){
  let count = document.getElementById("cart-count");
  if(count) count.textContent = cart.length;
}

updateCartCount();

/* CART PAGE */
let cartItems = document.getElementById("cart-items");
if(cartItems){
  let total = 0;
  cart.forEach((item,i)=>{
    total += item.price;
    cartItems.innerHTML += `
      <div>
        ${item.name} - $${item.price}
        <button onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  });
  document.getElementById("total").textContent = total;
}

function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  location.reload();
}

/* Dark Mode */
let toggle = document.getElementById("theme-toggle");
if(toggle){
  toggle.onclick=()=>{
    document.body.classList.toggle("dark");
  };
}
