import React from 'react';
import { atom, RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import './App.css';

const inventory = {
  a: { name: 'Yerba Mate', price: 10 },
  b: { name: 'Coffee', price: 15 },
  c: { name: 'Tea', price: 7.5 },
};

const destinations = {
  US: 25,
  CA: 35,
  CO: 45,
};

const cartState = atom({
  key: 'cartState',
  default: {},
});

function App() {
  return (
    <div>
      <AvailableItems />
      <Cart />
    </div>
  );
}

export default App;

function AvailableItems() {
  const [cart, setCart] = useRecoilState(cartState);
  return (
    <div>
      <h2>Available Items</h2>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      <ul>
        {Object.entries(inventory).map(([id, { name, price }]) => (
          <li key={id}>
            {name} @ ${price.toFixed(2)}
            <button
              onClick={() => {
                setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
              }}
            >
              add
            </button>
            {cart[id] && (
              <button
                onClick={() => {
                  const copy = { ...cart };
                  if (copy[id] === 1) {
                    delete copy[id];
                    setCart(copy);
                  } else {
                    setCart({ ...cart, [id]: copy[id] - 1 });
                  }
                }}
              >
                remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
function Cart() {
  return (
    <div>
      <h2>Cart</h2>
      <CartItems />
    </div>
  );
}
function CartItems() {
  //When you don't want to modify the state only read it, you use useRecoilValue
  const cart = useRecoilValue(cartState);
  if (Object.keys(cart).length === 0) return <p>No Items.</p>;
  return (
    <ul>
      {Object.entries(cart).map(([id, quantity]) => (
        <li key={id}>
          {inventory[id].name} x {quantity}
        </li>
      ))}
    </ul>
  );
}
