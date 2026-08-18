import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";
import { courseImage, formatPrice } from "../data/courses.js";
import './Cart.css'

export default function Cart(){
    const {items, removeItem, total} = useCart()

    return(
        <main>
            <section className="page-hero">
                <div className="wrap">
                    <p className="eyebrow">Checkout</p>
                    <h1>Your cart</h1>
                    <p>
                        {items.length === 0
                            ? 'Your cast is empty' 
                            : items.length+'course(s) selected.'
                        }
                    </p>
                </div>
            </section>

            <div className="page">
                {items.length===0 ? (
                    <Link to ="/courses" className="btn">Browse Courses</Link>
                ):(
                    <>
                        <ul className="cart-list">
                            {items.map((item)=>(
                                <li key={item.slug} className="cart-item card">
                                    <img src={courseImage(item)} alt="" />
                                    <div>
                                        <Link to={'/courses/' + item.slug}> {item.title}</Link>
                                        <p>{formatPrice(item.price)}</p>
                                    </div>
                                    <button type="button" onClick={()=>removeItem(item.slug)}>Remove</button>
                                </li>
                            ))}
                        </ul>

                        <p className="cart-total">Total: {formatPrice(total)}</p>
                        <Link to="/checkout" className="btn">
                        Continue to checkout
                        </Link>
                    </>
                )}
            </div>
        </main>
    )

}
