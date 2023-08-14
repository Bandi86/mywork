import React from "react";

export default function SearchBar({conditions, setConditions, setChecked}) {
  return (
    <div className="text-center p-4 mb-6">
      <input
      value={conditions.text}
        type="search"
        className="border-2 border-blue-500 rounded-lg w-[30rem] mt-6 h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        placeholder="Search..."
        onChange={(e)=> {
          if(e.target.value.length> 0){
            setChecked(true)
          } else {
            setChecked(false)

          }
          setConditions(prev=> ({...prev, text: e.target.value}))
        }}
      />
    </div>
  );
}
