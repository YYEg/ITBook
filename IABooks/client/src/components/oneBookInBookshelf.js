import React from "react";
import { NavLink } from "react-router-dom";

const OneBookInBookshelf = ({ book }) => {
  console.log(book);
  return (
    <div key={book.id} style={{ width: "100%" }} className="mb-3">
      <div class="grid gap-6  grid-cols-1 md:grid-cols-1">
        <div class="mb-1 lg:mb-0">
          <div class="block h-full rounded-xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div class="border-b-2 border-neutral-100 border-opacity-100 p-3 text-center dark:border-opacity-10">
              <h3 class="mb-1 text-3xl">
                <NavLink
                  className="link-warning mb-1 text-2xl font-bold"
                  to={`/film/${book.id}`}
                >
                  {book.name}
                </NavLink>
              </h3>
            </div>
            <div className="flex justify-center rounded-b-xl">
              <NavLink
                className="link-warning mb-1 text-2xl font-bold"
                to={`/film/${book.id}`}
              >
                <img
                  src={process.env.REACT_APP_API_URL + book.img}
                  className="rounded-xl shadow-xl"
                  style={{ width: "180px", height: 300 }}
                />
              </NavLink>
            </div>
            <div class="p-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneBookInBookshelf;
