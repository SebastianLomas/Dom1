/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
const app = document.querySelector('#app')
const BASE_URL = `https://platzi-avo.vercel.app`
const API_URL = `${BASE_URL}/api/avo`

const getAvocados = async function() {
  const response = await fetch(API_URL)
  const data = await response.json()
  console.log(data.data)

  data.data.forEach(product => createProductViews(product))
}

// Converts a string of classes into array so can be use with spred operator to be added to elements
// as classes
const stringToClasses = classString => classString.split(' ')
/*
  createImageElement and createTextElement are made out of a Tailwind component
  Do NOT worry about it.

*/
const createImageElement = function(url) {
  const picture = document.createElement('picture')
  const img = document.createElement('img')
  
  picture.classList.add(...stringToClasses("aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"))
  img.classList.add(...stringToClasses("h-full w-full object-cover object-center lg:h-full lg:w-full"))
  img.src = `${BASE_URL}/${url}`

  picture.appendChild(img)

  return picture
}

const createTextElement = function(name, price) {
  const div1 = document.createElement("div")
  const div2 = document.createElement("div")

  div1.classList.add(...stringToClasses("mt-4 flex justify-between"))

  const h3 = document.createElement('h3')
  const span = document.createElement('span')
  h3.textContent = name

  h3.classList.add(...stringToClasses("text-sm text-gray-700"))
  span.classList.add(...stringToClasses("absolute inset-0"))
  span.ariaHidden = true

  h3.appendChild(span)
  div2.appendChild(h3)
  div1.appendChild(div2)

  const p = document.createElement('p')
  p.textContent = formatPrice(price)
  p.classList.add(...stringToClasses("text-sm font-medium text-gray-900"))
  div1.appendChild(p)

  return div1
}

const createProductViews = function(product) {
  const appendTarget = document.querySelector('#products')
  const box = document.createElement('div')
  box.classList.add(...stringToClasses("group relative border border-gray-300 p-4"))

  const img = createImageElement(product.image)

  const info = createTextElement(product.name, product.price)

  box.appendChild(img)
  box.appendChild(info)
  appendTarget.appendChild(box)

  console.log(product)

}

const formatPrice = function(price) {
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD"
  }).format(price)

  return newPrice
}

//getAvocados()
window.onload = getAvocados
