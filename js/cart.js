var cart = [];

    function addtocart(id) {
      const selectedItem = {
        id: id,
        image: document.getElementsByClassName('images')[id].src,
        title: document.getElementsByClassName('p')[id].innerText,
        price: parseFloat(document.getElementsByClassName('h2')[id].innerText.slice(2))
      };

      const quantity = parseInt(document.getElementById(`quantity${id}`).value);
      const existingItem = cart.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        selectedItem.quantity = quantity;
        cart.push(selectedItem);
      }

      
      displaycart();
    }



    function delElement(index) {
      cart.splice(index, 1);
      displaycart();
    }

    function displaycart() {
      let total = 0;
      document.getElementById("count").innerHTML = cart.length;
      const cartItems = cart.map((item, index) => {
        var { image, title, price, quantity } = item;
        total += price * quantity;
        return (
          `<div class='cart-item' style='width: 30px;'>
            <div class='row-img' >
                <img class='rowimg' style='width: 40px;' src=${image}>
            </div>
            <p style='font-size:12px;'>${title}</p>
            <p style='font-size: 12px;'>Php ${price}.00 x ${quantity}</p>
            <div>
              <button class="btn btn-primary btn-sm text-uppercase" onclick='delElement(${index})' style='margin-right: 5px;'>Remove</button>
              <input type='number' value='${quantity}' min='1' onchange='updateQuantity(${index}, this.value)' style='width: 40px;'>
            </div>
          </div>`
        );
      }).join('');
      
      document.getElementById("cartItem").innerHTML = cart.length === 0 ? "Your cart is empty" : cartItems;
      document.getElementById("total").innerHTML = `Php ${total}.00`;
    }

    function updateQuantity(index, newQuantity) {
      cart[index].quantity = parseInt(newQuantity);
      displaycart();
    }

    function checkout() {
      // Save cart data to local storage
      localStorage.setItem('cartData', JSON.stringify(cart));
      
      // Perform checkout-related actions (e.g., clearing cart, redirecting to a confirmation page, etc.)
      cart = []; // Clear the cart after checkout
      displaycart(); // Update the cart display after clearing

      // Redirect to a confirmation or thank you page
      window.location.href = ''; // Replace with your confirmation page URL
    }
