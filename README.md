# Styled Map 3.0 ⭐️
Simple CSS-like syntax to map props to styles with Styled Components and Emotion.

⚠️ New API in v3! 🎉

## Install
`yarn add styled-map`

or

`npm install styled-map --save`

## Why Styled Map?
The following code works for one prop:

```js
const Button = styled.button`
  color: ${props => props.primary ? 'orange' : 'white'};
`;

 ```

 but it quickly turns messy:

 ```js
const Button = styled.button`
  color: ${props =>
    props.primary && 'orange' ||
    props.warning && 'red' ||
    props.info && 'blue' ||
    'white'
  };
  border: 2px solid ${props =>
    props.primary && 'orange' ||
    props.warning && 'red' ||
    props.info && 'blue' ||
    'white'
  };
  font-size: ${props => props.large ? '2.5rem' : '1rem' };
`;
 ```

## 😭

## How to use Styled Map
Thankfully we can greatly simplify things with `styled-map`:

```js
import styledMap from 'styled-map'

const buttonColor = styledMap`
  primary: orange;
  warning: red;
  info: blue;
  default: white;
`;

const Button = styled.button`
  color: ${buttonColor};
  border: 2px solid ${buttonColor};
  font-size: ${styledMap`
    large: 2.5rem;
    small: 1rem;
  `};
`;

<Button large primary>Click me!</Button>

```

Much better!

> Note: If there are no matching props, styled-map will look for a "default" item in your map. If it doesn't find one it will use the last item by default.

## Styled Map v3: Why the new syntax?
After using `styled-map` for several months I found the context switching between CSS and the style map JS objects to be awkward. 

This CSS-like syntax further simplifies things and fits better with Styled Components.

You can still use objects if you prefer

## What about themes?

Mapping to themes is easy. Import `mapToTheme` like this:

```js
import styledMap, { mapToTheme as theme } from 'styled-map';
```

and setup your themes like this:

```js
const myTheme = {
  buttonColor: {
    primary: 'orange',
    warning: 'red',
    info: 'blue',
    default: 'white',
  },
  ...
};
```

and now you can do this:

```js
const Button = styled.button`
  color: ${theme('buttonColor')};
  border: 2px solid ${theme('buttonColor')};
`;

```
> Note: importing `as theme` is optional, but it reads a lot better!

## Optionally mapping to prop values 

Sometimes you'll want to map styles to the *value* of a prop instead, e.g., you have a `type` variable to pass to your component and you don't want to do something like `<Button {...{[type]:true}} />`.

You can use `styled-map` in these situations by simply passing a prop name as the first argument. **This currently doesn't work with the CSS-like syntax — PRs welcome!**:

```js
const Button = styled.button`
  background: ${styledMap('type', {
    primary: '#c00',
    default: '#ddd',
  })};
`;
```

`styled-map` will then look at the Button's `type` prop for a matching value.

## License

MIT Copyright 2017–2018
