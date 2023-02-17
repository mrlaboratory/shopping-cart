const btn = document.getElementsByClassName('cart-btn')

for (const button of btn) {
    button.addEventListener('click', function (e) {
        addData(e)
        
        e.target.setAttribute('disabled',true)
    })
}


let pNo = 0;
function addData(e) {
    const parent = e.target.parentNode.parentNode;
    const pName = parent.getElementsByClassName('card-title')[0].innerText;
    const pPrice = parent.getElementsByClassName('price')[0].innerText;
    const pQuantity = parent.getElementsByClassName('quantity')[0].innerText;
    const pTotalPrice = parseInt(pPrice) * parseInt(pQuantity)
    const container = document.getElementById('table-container')
    pNo = parseInt(document.getElementById('table-container').children.length) + 1
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${pNo}</td>
    <td>${pName}</td>
    <td class="item-price">${pPrice}</td>
    <td>
    <div class="input-group number-spinner">
    <button class="btn-minus" class=""><i class="fas fa-minus"></i></button>
    <input  type="number" min="0"  class=" total-quantity form-control text-center w-[40px] outline-none border-none " value="${pQuantity}">
     <button class="btn-plus" class=""><i class="fas fa-plus"></i></button>
     </div>
    </td>
    <td class="item-total-price">${pTotalPrice}</td>
    <td ><i class="fa fa-trash remove-item  text-red-500 cursor-pointer" aria-hidden="true"></i>
    </td>
    `
    container.appendChild(tr);
    execute()
}


//  remove item function 
function removeitem(e) {
    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
}

// remove item event 
//  why i cant use direct function on there like this removeitem(e) ? 
function execute() {
    const items = document.getElementsByClassName('remove-item')
    for (const item of items) {
        item.addEventListener('click', function (e) {
            removeitem(e)
            totalCalculate()
        })
    }

    // quantity increment function 
    const incrementBtn = document.getElementsByClassName('btn-plus')
    for (const btn of incrementBtn) {
        btn.addEventListener('click', function (e) {
            let input = e.target.parentNode.parentNode.getElementsByClassName('total-quantity')[0]
            let inputValue = parseInt(input.value);
            input.value = inputValue + 1
            update(e.target.parentNode.parentNode.parentNode.parentNode)
        })
    }


    // quantity dicrement funciton 
    const dicrementBtn = document.getElementsByClassName('btn-minus')
    for (const btn of dicrementBtn) {
        btn.addEventListener('click', function (e) {
            let input = e.target.parentNode.parentNode.getElementsByClassName('total-quantity')[0]
            let inputValue = parseInt(input.value);

            if (inputValue > 0) {
                input.value = inputValue - 1
            }
            update(e.target.parentNode.parentNode.parentNode.parentNode)
        })
    }
    totalCalculate()

}





function update(e) {
    const itemPrice = parseInt(e.getElementsByClassName('item-price')[0].innerText)
    const itemQuantity = parseInt(e.getElementsByClassName('total-quantity')[0].value)
    const totalPrice = itemPrice * itemQuantity
    e.getElementsByClassName('item-total-price')[0].innerText = totalPrice
    totalCalculate()
}



// function for all total item price calculate 
function totalCalculate() {
    const itemPrice = document.getElementsByClassName('item-total-price')
    const totalItemPrice = document.getElementById('totalItemPrice')
    let sum = 0;
    for (const price of itemPrice) {
        sum += parseInt(price.innerText)
    }
    totalItemPrice.innerText = sum
}
execute();
totalCalculate()