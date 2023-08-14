import { Flowbite, Tabs, Button } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import { MdCategory, MdProductionQuantityLimits } from "react-icons/md";
import {
  categoriesCount,
  categoriesEndpoint,
  categoriesRecentEndpoint,
  ordersCount,
  ordersEndpoint,
  ordersRecentEndpoint,
  productsCount,
  productsEndpoint,
  productsRecentEndpoint,
} from "../../../repositories/apiEndPoints";
import { readEntry } from "../../../repositories/crud";
import { fetchForCurrentPage } from "../../../services/admin";
import { customTheme } from "../../../styles/customStyle";
import CategoryList from "../Categories/CategoryList";
import OrderRender from "../Orders/OrderRender";
import ProductRender from "../Products/ProductRender";
import SearchBar from "./SearchBar";
import Switcher from "./Switcher";
import { adminContext } from "../../../contexts/adminContext";
import { userContext } from "../../../contexts/userContext";

export default function DashboardLeft({
  setContentChanger,
  orderID,
  setOrderID,
  showOrderDetails,
  setShowOrderDetails,
}) {
  const [checked, setChecked] = useState(false);
  const [conditions, setConditions] = useState({
    text: "",
    asc: true,
    tabIdx: 0,
    limit: 10,
    currentPage: 1,
  });
  const [clickedItem, setClickItem] = useState([0, "asc"]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [render, setRender] = useState({
    limit: 10,
    offset: 0,
  });

  const [ordersLength, setOrdersLength] = useState("");
  const [productsLength, setProductsLength] = useState("");
  const [categorysLength, setCategorysLength] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedTab, setSelectedTab] = useState(0);
  const { adminRefresh, setAdminRefresh } = useContext(adminContext);
  const { user, isLoggedIn } = useContext(userContext);
  let tabName = null;

  useEffect(() => {
    const fetchProductsForCurrentPage = async (params) => {
      try {
        const { filter, order, reverse, limit, offset } = params;
        const url = `${productsEndpoint}/${filter}/${order}/${reverse}/${limit}/${offset}`;
        const res = await readEntry(url);
        const data = await res.json();
        setProducts(data.resdata);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    const fetchOrdersForCurrentPage = async (params) => {
      try {
        const { filter, order, reverse, limit, offset } = params;
        const url = `${ordersEndpoint}/${filter}/${order}/${reverse}/${limit}/${offset}`;
        const res = await readEntry(url);
        const data = await res.json();
        setOrders(data.resdata);
      } catch (error) {
        console.error("Failed to fetch oders:", error);
      }
    };
    const fetchCategoriesForCurrentPage = async (params) => {
      try {
        const { filter, order, reverse, limit, offset } = params;
        const url = `${categoriesEndpoint}/${filter}/${order}/${reverse}/${limit}/${offset}`;
        const res = await readEntry(url);
        const data = await res.json();
        setCategories(data.resdata);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    let filterText = conditions.text;
    if (conditions.text == "") {
      filterText = "_";
    }
    // ORDER
    if (selectedTab === 0) {
      switch (conditions.tabIdx) {
        case 1:
          tabName = "id";
          break;
        case 2:
          tabName = "status";
          break;
        case 3:
          tabName = "created_at";
          break;
        case 4:
          tabName = "updated_at";
          break;
        case 5:
          tabName = "contactEmail";
          break;
        case 6:
          tabName = "contactPhone";
          break;
        case 7:
          tabName = "total";
          break;
        case null:
          tabName = "created_at";
          break;
      }

      readEntry(ordersCount).then((res) => {
        res.json().then((data) => {
          const value = Object.values(data.resdata);
          const valueFromIndex = value;
          const numberValue = parseInt(valueFromIndex, 10);
          setOrdersLength(numberValue);
          if (!checked) {
            readEntry(ordersRecentEndpoint).then((res) => {
              res.json().then((data) => {
                setOrders(data.resdata);
              });
            });
          } else {
            setTotalPages(Math.ceil(numberValue / render.limit));
            fetchOrdersForCurrentPage({
              filter: filterText,
              order: tabName,
              reverse: conditions.asc,
              limit: conditions.limit,
              offset: (currentPage - 1) * conditions.limit,
            });
          }
        });
      });
    }

    // PRODUCT
    if (selectedTab === 1) {
      switch (conditions.tabIdx) {
        case 1:
          tabName = "id";
          break;
        case 2:
          tabName = "name";
          break;
        case 3:
          tabName = "category_id";
          break;
        case 4:
          tabName = "isDeleted";
          break;
        case 5:
          tabName = "price";
          break;
        case 6:
          tabName = "created_at";
          break;
        case 7:
          tabName = "updated_at";
          break;
        case null:
          tabName = "created_at";
          break;
      }
      readEntry(productsCount).then((res) => {
        res.json().then((data) => {
          const value = Object.values(data.resdata);
          const valueFromIndex = value;
          const numberValue = parseInt(valueFromIndex, 10);
          setProductsLength(numberValue);
          console.log(checked);
          if (!checked) {
            readEntry(productsRecentEndpoint).then((res) => {
              res.json().then((data) => {
                setProducts(data.resdata);
              });
            });
          } else {
            setTotalPages(Math.ceil(numberValue / conditions.limit));
            fetchProductsForCurrentPage({
              filter: filterText,
              order: tabName,
              reverse: conditions.asc,
              limit: conditions.limit,
              offset: (currentPage - 1) * conditions.limit,
            });
          }
        });
      });
    }

    // CATEGORY
    if (selectedTab === 2) {
      console.log(conditions.tabIdx);
      switch (conditions.tabIdx) {
        case 1:
          tabName = "id";
          break;
        case 2:
          tabName = "name";
          break;
        case 3:
          tabName = "created_at";
          break;
        case 4:
          tabName = "updated_at";
          break;
        case null:
          tabName = "created_at";
          break;
      }
      readEntry(categoriesCount).then((res) => {
        res.json().then((data) => {
          const value = Object.values(data.resdata);
          const valueFromIndex = value;
          const numberValue = parseInt(valueFromIndex, 10);
          setCategorysLength(numberValue);
          if (!checked) {
            readEntry(categoriesRecentEndpoint).then((res) => {
              res.json().then((data) => {
                setCategories(data.resdata);
              });
            });
          } else {
            setTotalPages(Math.ceil(numberValue / render.limit));
            fetchCategoriesForCurrentPage({
              filter: filterText,
              order: tabName,
              reverse: conditions.asc,
              limit: conditions.limit,
              offset: (currentPage - 1) * conditions.limit,
            });
          }
        });
      });
    }
    console.log(`selectedTab,
    checked,
    render.limit,
    adminRefresh,
    user,
    isLoggedIn,
    conditions`, selectedTab,
      checked,
      render.limit,
      adminRefresh,
      user,
      isLoggedIn,
      conditions)
  }, [
    selectedTab,
    checked,
    render.limit,
    adminRefresh,
    user,
    isLoggedIn,
    conditions,
  ]);

  useEffect(() => {
    let endpoint = "";
    let setter = "";

    if (selectedTab === 0) {
      endpoint = ordersEndpoint;
      setter = setOrders;
    } else if (selectedTab === 1) {
      endpoint = productsEndpoint;
      setter = setProducts;
    } else if (selectedTab === 2) {
      endpoint = categoriesEndpoint;
      setter = setCategories;
    }
    fetchForCurrentPage(currentPage, readEntry, endpoint, render.limit, setter);
  }, [currentPage, adminRefresh, user, isLoggedIn]);

  function selectOption(e) {
    setConditions((prev) => ({ ...prev, limit: Number(e.target.value) }));
    setRender({ ...render, limit: Number(e.target.value) });
  }
  async function handleRefresh() {
    setConditions({
      text: "",
      asc: true,
      tabIdx: 0,
      limit: 10,
      currentPage: 1,
    });
    setChecked(false);
    setClickItem([0, "asc"]);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-10">
        <SearchBar
          conditions={conditions}
          setConditions={setConditions}
          setChecked={setChecked}
        />
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="flex flex-row">
            <Switcher
              checked={checked}
              setChecked={setChecked}
              setConditions={setConditions}
            />
          </div>
          {checked && (
            <>
              <div className="p-2">
                <select id="options" onChange={selectOption}>
                  <option value="10" className="text-center">
                    Limit: 10
                  </option>
                  <option value="25" className="text-center">
                    Limit: 25
                  </option>
                  <option value="50" className="text-center">
                    Limit: 50
                  </option>
                  <option value="100" className="text-center">
                    Limit: 100
                  </option>
                </select>
              </div>
              <div>
                <Button className="bg-blue-600" onClick={handleRefresh}>
                  Reset filters
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Flowbite theme={{ theme: customTheme }}>
        <Tabs.Group
          aria-label="Tabs with icons"
          style="underline"
          color="#1C64F2"
          onActiveTabChange={(tab) => {
            setContentChanger(tab);
            setSelectedTab(tab);
          }}
        >
          <Tabs.Item
            active
            icon={FiDollarSign}
            title={!checked ? "Recent Orders" : "All Orders"}
            color="#1C64F2"
          >
            <OrderRender
              checked={checked}
              setChecked={setChecked}
              clickedItem={clickedItem}
              setClickItem={setClickItem}
              orders={orders}
              setOrders={setOrders}
              ordersLength={ordersLength}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              conditions={conditions}
              setConditions={setConditions}
              orderID={orderID}
              setOrderID={setOrderID}
              showOrderDetails={showOrderDetails}
              setShowOrderDetails={setShowOrderDetails}
              selectedTab={selectedTab}
            />
          </Tabs.Item>
          <Tabs.Item
            icon={MdProductionQuantityLimits}
            title={!checked ? "Recent Products" : "All Products"}
          >
            <ProductRender
              checked={checked}
              setChecked={setChecked}
              clickedItem={clickedItem}
              setClickItem={setClickItem}
              products={products}
              setProducts={setProducts}
              productsLength={productsLength}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              conditions={conditions}
              setConditions={setConditions}
            />
          </Tabs.Item>
          <Tabs.Item
            icon={MdCategory}
            title={!checked ? "Recent Categories" : "All Categories"}
          >
            <CategoryList
              checked={checked}
              setChecked={setChecked}
              clickedItem={clickedItem}
              setClickItem={setClickItem}
              categories={categories}
              setCategories={setCategories}
              categorysLength={categorysLength}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              conditions={conditions}
              setConditions={setConditions}
            />
          </Tabs.Item>
        </Tabs.Group>
      </Flowbite>
    </>
  );
}
