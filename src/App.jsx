import {useEffect, useState} from 'react'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BooksPage from "./pages/BooksPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import BookPage from "./pages/BookPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import {jwtDecode} from "jwt-decode";
import {CartContext as CartContext1} from "./CartContext.jsx";
import {AuthProvider, useAuth} from "./AuthContext.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import Page404 from "./pages/Page404.jsx";

function App() {
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    // Initialize cart from localStorage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const queryClient = new QueryClient();
    const { loggedIn, admin, logout: authLogout } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("cart");
        setCart([]);
        authLogout();
    }

    const ProtectedRoute = ({ children }) => {
        const token = localStorage.getItem("token");

        if (!token) {
            return <Navigate to={"*"} replace={true}/>
        }

        try {
            const decoded = jwtDecode(token);
            if (decoded.role === "ROLE_ADMIN") {
                return children;
            }
        } catch (error) {
            console.error("Invalid token:", error);
        }

        return <Navigate to={"*"} replace={true}/>
    }

    // Check if user is already logged in on mount
    useEffect(() => {
        setIsCartLoaded(true);
    }, [])

    // Save cart to localStorage whenever it changes (but not on initial mount)
    useEffect(() => {
        if (isCartLoaded) {
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Cart saved to localStorage:', cart);
        }
    }, [cart, isCartLoaded]);

    const addToCart = (book) => {
        console.log('addToCart called with:', book);
        setCart(prevCart => {
            // Support both isbn and isbn_id field names
            const bookId = book.isbn || book.isbn_id;
            const existingItem = prevCart.find(item => (item.isbn || item.isbn_id) === bookId);
            if (existingItem) {
                console.log('Book already in cart, incrementing quantity');
                return prevCart.map(item =>
                    (item.isbn || item.isbn_id) === bookId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            console.log('Adding new book to cart');
            return [...prevCart, { ...book, quantity: 1 }];
        });
    };

    const removeFromCart = (isbn) => {
        setCart(prevCart => prevCart.filter(item => (item.isbn || item.isbn_id) !== isbn));
    };

    const updateQuantity = (isbn, quantity) => {
        if (quantity <= 0) {
            removeFromCart(isbn);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                (item.isbn || item.isbn_id) === isbn ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
      <CartContext1 value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
          <div className={"w-screen min-h-screen bg-gradient-to-r from-cyan-500 to-indigo-500"}>
              <QueryClientProvider client={queryClient}>
                  <Navbar logoutAction={handleLogout} cartCount={cartCount}/>
                  <Routes>
                      <Route path="/" element={<HomePage loggedIn={loggedIn}/>} />
                      <Route path="/login" element={<LoginPage logInState={loggedIn}/>} />
                      <Route path="/books" element={<BooksPage/>} />
                      <Route path="/register" element={<RegisterPage logInState={loggedIn}/>} />
                      <Route path={"/books/:isbn_id"} element={<BookPage/>} />
                      <Route path={"/cart"} element={<CartPage/>}/>
                      <Route path={"/checkout"} element={<CheckoutPage/>}/>
                      <Route path={"/return"} element={<OrderConfirmationPage/>}/>
                      <Route path={"*"} element={<Page404/>}/>
                      {/* protected routing, only admin users should be able to access this page */}
                      <Route path={"/admin"} element={<ProtectedRoute><AdminPage/></ProtectedRoute>} />
                  </Routes>
                  <Footer/>
              </QueryClientProvider>
          </div>
      </CartContext1>
  )
}

export default App
