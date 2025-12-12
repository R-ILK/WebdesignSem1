// shop.js
document.querySelectorAll('.addtocart').forEach(button => {
    button.addEventListener('click', () =>{
        var total=localStorage.getItem('checkout');
        total++;
        localStorage.setItem('checkout',total);
        document.querySelector('#checkout').innerHTML=total;
    })
 });