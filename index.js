document.addEventListener("DOMContentLoaded", () => {
  addToOrder()
  fetchBurgers()
  createNewBurger()
})
const menuContainer = document.querySelector('#burger-menu')
const orderList = document.querySelector('#order-list')


const fetchBurgers = () => {
  fetch('http://localhost:3000/burgers')
  .then(response => response.json())
  .then(burgers => {
    burgers.forEach(burger => displayBurgerMenu(burger))
  })
};

const displayBurgerMenu = (burger) => {
  menuContainer.innerHTML += `
  <div data-id=${burger.id} class="burger">
  <h3 class="burger_title">${burger.name}</h3>
  <img src=${burger.image}>
  <p class="burger_description">${burger.description}</p>
  <button class="button">Add to Order</button>
  <button class="delete">Delete Burger</button>
  </div>
  `
};

const addToOrder = () => {
  menuContainer.addEventListener('click', function(event){
    if(event.target.className === 'button'){
      let burger = event.target.parentElement.querySelector('.burger_title').textContent
      const burgerLi = document.createElement('li')
      burgerLi.textContent = burger
      orderList.append(burgerLi)
    }
    if (event.target.className === 'delete') {
      const badBurger = event.target.parentElement.dataset.id
      event.target.parentElement.remove()
      destroyBurger(badBurger)
    }
  })
};

const createNewBurger = () => {
  const newBurgerForm = document.querySelector('#custom-burger')
  newBurgerForm.addEventListener('submit', function(event){
    event.preventDefault()
    let name = event.target.name.value
    let description = event.target.description.value
    let image = event.target.url.value
    const newBurgerLi = document.createElement('li')
    newBurgerLi.textContent = name
    orderList.append(newBurgerLi)

    newBurgerForm.reset()
    saveNewBurger(name, description, image)
  })
};

const saveNewBurger = (name, description, image) => {
  fetch('http://localhost:3000/burgers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      description: description,
      image: image
    })
  })
  .then(response => response.json())
  .then(burger => displayBurgerMenu(burger))
}

const destroyBurger = (burger) => {
  fetch(`http://localhost:3000/burgers/${burger}`, {
    method: 'DELETE'
  })
}

 

