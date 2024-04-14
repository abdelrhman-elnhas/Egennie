const plus = document.querySelector(".quantity .plus"),
minus = document.querySelector(".quantity .minus"),
num = document.querySelector(".quantity .num");
let a = 1;
plus.addEventListener("click", ()=>{
  a++;
  a = (a < 10) ? "0" + a : a;
  num.value = a;
});
minus.addEventListener("click", ()=>{
  if(a > 1){
    a--;
    a = (a < 10) ? "0" + a : a;
    num.value = a;
  }
});

//  Hovered Image
const allHoverImages = document.querySelectorAll('.hover-container div img');
const imgContainer = document.querySelector('.img-container');

window.addEventListener('DOMContentLoaded', () => {
    allHoverImages[0].parentElement.classList.add('active');
});

allHoverImages.forEach((image) => {
    image.addEventListener('mouseover', () =>{
        imgContainer.querySelector('img').src = image.src;
        resetActiveImg();
        image.parentElement.classList.add('active');
    });
});

function resetActiveImg(){
    allHoverImages.forEach((img) => {
        img.parentElement.classList.remove('active');
    });
}

//  Increase price function
var qty = document.getElementById('selectedQty');
var priceDisplay = document.getElementById('totalPrice');
var basePrice = parseInt(priceDisplay.textContent);

function updatePrice() {
    var quantity = parseInt(qty.value);
    var totalPrice = basePrice * quantity;
    priceDisplay.textContent = totalPrice;
    console.log(totalPrice);
}
qty.addEventListener('input', updatePrice);
qty.addEventListener('change', updatePrice);
updatePrice();