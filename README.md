# recoil-tutorial

[Recoil Documentation](https://recoiljs.org/docs/introduction/getting-started)

## React Recoil State Management

You need to have React installed and runnint to use Recoil.

- Install The Recoil packages using npm

```
npm install recoil
```

Or using yarn:

```
yarn add recoil
```

## RecoilRoot

Components that use recoil state need RecoilRoot to appear somehwere in the parent tree.

```
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilSTate,
  useRecoilValue,
} from "recoil"

function App() {
  return (
    <div>
      <AvailableItems />
      <Cart />
      <Shipping />
      <Totals />
    </div>
  );
}
```

## Atom

An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicity subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom:

```
const textState = atom({
  key: textState, // unique ID (with respect to other atoms/selectors)
  default:"", // default value (aka initial value)
})
```

Components that need to read from and write to an atom should use useRecoilSTate() as shown bellow:

```
function Shipping() {
  const [shipping, setShipping] = useRecoilState(shippingState);
  return (
    <div>
      <h2>Shipping</h2>
      {Object.entries(destinations).map(([country, price]) => (
        <button
          onClick={() => {
            setShipping(country);
          }}
        >
          {country} @ {price}
          {country === shipping ? <span> ^</span> : ''}
        </button>
      ))}
    </div>
  );
}
```

## Selector

A selector represents a piece of derived state. Derived state is a transformation of state. You can think of derived state as the output of passing state to a pure function that modfies the given state in some way:

```

const totalState = selector({
  key: 'totalState',
  // get is a function that receives a function called get
  get: ({ get }) => {
    const cart = get(cartState);
    const shipping = get(shippingState);
    const subtotal = Object.entries(cart).reduce(
      (acc, [id, quantity]) => acc + inventory[id].price * quantity,
      0
    );
    const shippingTotal = destinations[shipping];
    return {
      subtotal,
      shipping: shippingTotal,
      total: subtotal + shippingTotal,
    };
  },
});
```

We can use the useRecoilValue() hook to read the value of totalState:

```
function Totals() {
  const totals = useRecoilValue(totalState);
  return (
    <div>
      <h2>Totals</h2>
      <p>Subtotal: ${totals.subtotal.toFixed(2)}</p>
      <p>Shipping: ${totals.shipping.toFixed(2)}</p>
      <p>
        <strong>Total: ${totals.total.toFixed(2)}</strong>
      </p>
    </div>
  );
}
```
