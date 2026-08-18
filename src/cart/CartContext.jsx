import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'arwain-cart'

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }, [items])

    function addItem(course) {
        setItems((current) => {
            if (current.some((item) => item.slug === course.slug)) return current
            return [
                ...current,
                {
          slug: course.slug,
          title: course.title,
          price: course.price,
          image: course.image,
        },
            ]
        })
    }

    function removeItem(slug) {
        setItems((current) => current.filter((item) => item.slug !== slug))
    }

    const total = items.reduce((sum, item) => sum + item.price, 0)
    const count = items.length

    function clearCart() {
        setItems([])
    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const cart = useContext(CartContext)
    if (!cart) throw new Error('useCart must be inside CartProvider')
    return cart
}