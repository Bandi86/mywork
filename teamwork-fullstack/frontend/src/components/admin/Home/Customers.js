import React, { useState, useEffect } from "react";
import { Button, Flowbite, Tabs } from "flowbite-react";
import { HiUsers } from "react-icons/hi";
import { usersEndpoint } from "../../../repositories/apiEndPoints";
import { fetchUsers } from "../../../repositories/refreshCrud";
import SearchBar from "./SearchBar";
import CustomerRender from '../Users/CustomerRender';
import Switcher from "./Switcher.js";


export default function Customers(/* { setContentChanger } */) {
  const [checked, setChecked] = useState(false);
  const [users, setUsers] = useState([]);
  const [clickedItem, setClickItem] = useState([0, "asc"]);
  const [conditions, setConditions] = useState({ text: "", asc: true, tabIdx: 0, limit: 10, currentPage: 1 });
  const [render, setRender] = useState({
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    async function fetchData() { //async nem biztos hogy kell
      try {
        fetchUsers(render.limit, render.offset, setUsers);

      } catch (error) {
        console.error("Fail with refresh data:", error);
      }
    } fetchData();
  }, [render.offset, checked, clickedItem]);

  function selectOption(e) {
    setConditions(prev => ({ ...prev, limit: Number(e.target.value) }))
    setRender({ ...render, offset: e.target.value });
  }
  async function handleRefresh() {
    setConditions({ text: "", asc: true, tabIdx: 0, limit: 10, currentPage: 1 })
    setChecked(false);
    setClickItem([0, "asc"]);

  }


  return (
    <>
      <div className="flex flex-row items-center justify-center gap-10">
        <SearchBar conditions={conditions} setConditions={setConditions} setChecked={setChecked} />
        <div className="flex flex-row items-center gap-2 ">
          <div className="flex flex-row">
            <Switcher checked={checked} setChecked={setChecked} setConditions={setConditions} />
          </div>

          {checked && <>
            <div className="p-2 ">
              <select id="options" onChange={selectOption}>
                <option value="10" className="text-center">Limit: 10</option>
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
          </>}
        </div>

      </div>
      {/* <h1 className='text-blue-600 text-xl text-center font-bold p-6'>Users</h1> */}
      <Flowbite >
        <Tabs.Group
          aria-label="Tabs with icons"
          style="underline"
          color="#1C64F2"
        >
          <Tabs.Item
            active
            icon={HiUsers}
            title={!checked ? "Recent Users" : "All Users"}
            color="#1C64F2"
          >
            <CustomerRender
              conditions={conditions}
              setConditions={setConditions}
              checked={checked}
              setChecked={setChecked}
              render={{ render, setRender }}
              users={users} setUsers={setUsers}
              clickedItem={clickedItem}
              setClickItem={setClickItem}
            />
          </Tabs.Item>
        </Tabs.Group>
      </Flowbite>
    </>
  );
}
