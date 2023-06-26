// React:
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Services:
import { read, update } from './services/productServices';
import { setTotalCartAmount, mergeCarts } from './services/cartServices';

// Contexts:
import { ProductsContext, AuthContext, FavoritesContext } from './context/UserContexts';
import { AdminProductsContext, AdminOrdersContext } from './context/AdminContexts';
import {
	AnonymCartContext,
	UserCartContext,
	CartItemsContext,
} from './context/CartContext';

// Components:
import AdminLayout from './components/admin/AdminLayout';
import Layout from './components/user/Layout';
import AdminUserList from './components/admin/AdminUserList';
import AdminOrderDetails from './components/admin/orders/AdminOrderDetails';

// Components - UserProfile:
import UserSite from './components/user/UserProfile/UserSite';
import UserProfile from './components/user/UserProfile/UserProfile';
import UserAdress from './components/user/UserProfile/UserAdress';
import UserOrder from './components/user/UserProfile/UserOrder';
import UserFavorites from './components/user/UserProfile/UserFavorites';

// Pages:
import Admin from './pages/admin/Admin';
import AdminProductAdd from './pages/admin/AdminProductAdd';
import AdminProductDelete from './pages/admin/AdminProductDelete';
import AdminProductEditPage from './pages/admin/AdminProductEditPage';
import AdminProductList from './pages/admin/AdminProductList';
import AdminCategory from './pages/admin/AdminCategory';
import AdminCategoryAdd from './pages/admin/AdminCategoryAdd';
import AdminCategoryDelete from './pages/admin/AdminCategoryDelete';
import AdminCategoryEditPage from './pages/admin/AdminCategoryEditPage';
import AdminOrders from './pages/admin/AdminOrders';
import About from './pages/user/About';
import Cart from './pages/user/Cart';
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Products from './pages/user/Products';
import ProductDetailsPage from './pages/user/ProductDetailsPage';
import Orders from './pages/user/Orders';
import Favorites from './pages/user/Favorites';

// CSS:
import './styles/app.css';

//Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/termekek', element: <Products /> },
			{ path: '/termekek/:currentPage', element: <Products /> },
			{ path: '/termekek/:rendezes', element: <Products /> },
			{ path: '/termekek/:rendezes/:currentPage', element: <Products /> },
			{ path: '/termek/:termekID', element: <ProductDetailsPage /> },
			{ path: '/kosar', element: <Cart /> },
			{ path: '/rolunk', element: <About /> },
			{ path: '/belepes', element: <Login /> },
			{ path: '/kedvencek', element: <Favorites /> },
			{
				path: '/felhasznalo-profil/:id',
				element: <UserSite />,
				children: [
					{ path: '/felhasznalo-profil/:id/adatlap', element: <UserProfile /> },
					{ path: '/felhasznalo-profil/:id/cimjegyzek', element: <UserAdress /> },
					{ path: '/felhasznalo-profil/:id/megrendelesek', element: <UserOrder /> },
					{ path: '/felhasznalo-profil/:id/kedvencek', element: <UserFavorites /> },
				],
			},
			{ path: '/megrendeles', element: <Orders /> },
		],
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{ path: '/admin', element: <Admin /> },
			{ path: '/admin/termekek/:currentPage', element: <AdminProductList /> },
			{ path: '/admin/termekek/:rendezes', element: <AdminProductList /> },
			{ path: '/admin/termekek/:rendezes/:currentPage', element: <AdminProductList /> },
			{ path: '/admin/termek-felvitel', element: <AdminProductAdd /> },
			{ path: '/admin/termekek', element: <AdminProductList /> },
			{
				path: '/admin/termekek/:id/modositas/:listPage',
				element: <AdminProductEditPage />,
			},
			{ path: '/admin/termekek/:id/torles/:listPage', element: <AdminProductDelete /> },
			{ path: '/admin/users', element: <AdminUserList /> },
			{ path: '/admin/kategoriak/uj-kategoria', element: <AdminCategoryAdd /> },
			{ path: '/admin/kategoriak', element: <AdminCategory /> },
			{ path: '/admin/kategoriak/:id/torles', element: <AdminCategoryDelete /> },
			{ path: '/admin/kategoriak/:id/modositas/', element: <AdminCategoryEditPage /> },
			{ path: '/admin/megrendelesek', element: <AdminOrders /> },
			{ path: '/admin/megrendelesek/:megrendelesID', element: <AdminOrderDetails /> },
		],
	},
]);

function App() {
	// user:
	const [productsData, setProductsData] = useState([]);
	const [productsFiltered, setProductsFiltered] = useState([]);
	const [productsFilteredPrice, setProductsFilteredPrice] = useState([]);
	const [productsFilteredSorted, setproductsFilteredSorted] = useState([]);
	const [productsFilteredCategory, setProductsFilteredCategory] = useState([]);
	const [users, setUsers] = useState([]);
	const [favorites, setFavorites] = useState({});
	const [favoritesSync, setFavoritesSync] = useState({});

	// admin:
	const [adminProductsData, setAdminProductsData] = useState([]);
	const [adminProductsFiltered, setAdminProductsFiltered] = useState([]);
	const [adminProductsFilteredPrice, setAdminProductsFilteredPrice] = useState([]);
	const [adminProductsFilteredSorted, setAdminProductsFilteredSorted] = useState([]);
	const [adminProductsFilteredCategory, setAdminProductsFilteredCategory] = useState([]);
	const [adminOrders, setAdminOrders] = useState([])
	const [adminOrdersTrigger, setAdminOrdersTrigger] = useState(true)

	// Cart:
	const [anonymCart, setAnonymCart] = useState({});
	const [userCartFromDB, setUserCartFromDB] = useState({});
	const [userCartDBSync, setUserCartDBSync] = useState({});
	const [cartItems, setCartItems] = useState([]);
	const [cartItemsCount, setCartItemsCount] = useState(0);
	const [total, setTotal] = useState(0);

	// USEEFFECTS
	useEffect(() => {
		read('users', setUsers);
	}, []);

	useEffect(() => {
		const loggedInUser = users.find((user) => user.isLoggedIn);
		console.log('appJs, favorites', favorites);
		if (loggedInUser) {
			try {
				update(favorites, `users/${loggedInUser.item}`, `favorites`).then((res) => {
					try {
						read(`users/${loggedInUser.item}/favorites`)
							.then((res) => res.json())
							.then((json) => {
								if (json == undefined || json == null) {
									setFavoritesSync({});
								} else {
									setFavoritesSync(json);
								}
							});
					} catch (error) { }
				});
			} catch (error) { }
		}
	}, [favorites]);

	useEffect(() => {
		setCartItemsCount(setTotalCartAmount(anonymCart));
	}, [anonymCart]);

	useEffect(() => {
		const loggedInUser = users.find((user) => user.isLoggedIn);
		try {
			update(userCartFromDB, `users/${loggedInUser.item}`, `/cart`) //user cart DB alatt update
				.then((res) => {
					try {
						read(`users/${loggedInUser.item}/cart`)
							.then((res) => res.json())
							.then((json) => {
								if (json == undefined || json == null) {
									setUserCartDBSync({});
									setCartItemsCount(0);
								} else {
									setUserCartDBSync(json);
									setCartItemsCount(setTotalCartAmount(json));
								}
							});
					} catch (error) { }
				});
		} catch (error) { }
	}, [userCartFromDB]);

	useEffect(() => {
		const loggedInUser = users.find((user) => user.isLoggedIn);
		if (loggedInUser) {
			try {
				read(`users/${loggedInUser.item}/cart`)
					.then((res) => res.json())
					.then((json) => {
						update(
							mergeCarts(anonymCart, json),
							`users/${loggedInUser.item}`,
							`/cart`
						).then((res) => {
							try {
								read(`users/${loggedInUser.item}/cart`)
									.then((res) => res.json())
									.then((json) => {
										if (json == undefined || json == null) {
											setUserCartFromDB({});
											setUserCartDBSync({});
										} else {
											setUserCartFromDB(json);
											setUserCartDBSync(json);
										}
									});
							} catch (error) { }
						});
					});
			} catch (error) { }

			try {
				read(`users/${loggedInUser.item}/favorites`)
					.then((res) => res.json())
					.then((json) => {
						if (json == undefined || json == null) {
							setFavorites({});
						} else {
							setFavorites(json);
						}
					});
			} catch (error) { }
		}
	}, [users]);

	return (
		<>
			<AdminProductsContext.Provider
				value={{
					adminProductsData,
					setAdminProductsData,
					adminProductsFiltered,
					setAdminProductsFiltered,
					adminProductsFilteredPrice,
					setAdminProductsFilteredPrice,
					adminProductsFilteredSorted,
					setAdminProductsFilteredSorted,
					adminProductsFilteredCategory,
					setAdminProductsFilteredCategory,
				}}
			>
				<AdminOrdersContext.Provider value={{ adminOrders, setAdminOrders, adminOrdersTrigger, setAdminOrdersTrigger }} >
					<ProductsContext.Provider
						value={{
							productsData,
							setProductsData,
							productsFiltered,
							setProductsFiltered,
							productsFilteredPrice,
							setProductsFilteredPrice,
							productsFilteredSorted,
							setproductsFilteredSorted,
							productsFilteredCategory,
							setProductsFilteredCategory,
						}}
					>
						<AuthContext.Provider value={{ users, setUsers }}>
							<CartItemsContext.Provider
								value={{
									cartItems,
									setCartItems,
									cartItemsCount,
									setCartItemsCount,
									total,
									setTotal,
								}}
							>
								<FavoritesContext.Provider
									value={{ favorites, setFavorites, favoritesSync, setFavoritesSync }}
								>
									<UserCartContext.Provider
										value={{
											userCartFromDB,
											setUserCartFromDB,
											userCartDBSync,
											setUserCartDBSync,
										}}
									>
										<AnonymCartContext.Provider value={{ anonymCart, setAnonymCart }}>
											<ToastContainer
												position='top-right'
												autoClose={5000}
												hideProgressBar={false}
												newestOnTop={false}
												closeOnClick
												rtl={false}
												pauseOnFocusLoss
												draggable
												pauseOnHover
												theme='light'
											/>
											<RouterProvider router={router} />
										</AnonymCartContext.Provider>
									</UserCartContext.Provider>
								</FavoritesContext.Provider>
							</CartItemsContext.Provider>
						</AuthContext.Provider>
					</ProductsContext.Provider>
				</AdminOrdersContext.Provider>
			</AdminProductsContext.Provider>
		</>
	);
}

export default App;
