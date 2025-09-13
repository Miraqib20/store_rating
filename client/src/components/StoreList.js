import React from "react";

const StoreList = ({ stores }) => {
  return (
    <div>
      {stores && stores.length > 0 ? (
        stores.map((store, index) => (
          <div key={store.id || store.name || index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{store.name}</h3>
            <p>{store.address}</p>
          </div>
        ))
      ) : (
        <p>No stores available.</p>
      )}
    </div>
  );
};

export default StoreList;
