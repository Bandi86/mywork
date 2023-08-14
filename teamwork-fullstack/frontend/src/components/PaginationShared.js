import { Pagination } from "flowbite-react";
import React, { useState, useEffect } from "react";

export default function PaginationShared({
  checked,
  currentPage,
  setCurrentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) {
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    checked && (
      <Pagination
        layout="pagination"

        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          if (page !== currentPage) {
            // Ha a felhasználó lapozott, akkor hívjuk meg a kapott page paraméterrel az onPreviousPage vagy onNextPage függvényt
            if (page < currentPage) {
              onPreviousPage();
            } else {
              onNextPage();
            }
          }
        }}
        showIcons
        totalPages={totalPages}
        className="flex flex-row justify-center py-6"
      />
    )
  );
}
