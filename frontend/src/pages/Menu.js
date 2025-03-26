import React from 'react'
import Hero from '../components/Hero'
import MenuPage from '../components/MenuPage'

function Menu() {
  return (
    <div>
        <Hero title= "Menu" desc="Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the 'Order Online' button located below the menu" />
        <MenuPage />
    </div>
  )
}

export default Menu