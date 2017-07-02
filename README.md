# Styled Map
Super simple lib to map props to styles with `styled-components`.

## Install
`yarn add styled-map`

or

`npm install styled-map --save`

## Why?
The following code works for one prop:

```js
const Button = styled.button`
  color: ${props => props.primary ? 'orange' : 'white'};
`;

 ```

 but it starts to get messy with more:

```js
const Button = styled.button`
  color: ${props =>
    props.primary && 'orange' ||
    props.warning && 'red' ||
    props.info && 'blue' ||
    'white'
  };
`;
 ```

 And with multiple CSS properties it's even worse:

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

const buttonColor = styledMap({
  primary: 'orange',
  warning: 'red',
  info: 'blue',
  default: 'white',
});

const Button = styled.button`
  color: ${buttonColor};
  border: 2px solid ${buttonColor};
  font-size: ${styledMap({
    large: '2.5rem',
    small: '1rem',
  })};
`;

<Button large primary>Click me!</Button>

```

Much better!

> Note: If there are no matching props, styled-map will look for a "default" item in your map. If it doesn't find one it will use the last item by default.

## Optionally mapping to prop values

Sometimes you'll want to map styles to the value of a prop instead, e.g., you have a `type` variable to pass to your component and you don't want to do something like `<Button {...{[type]:true}} />`.

Since `v2.0.0` you can use `styled-map` in these situations by simply passing a prop name as the first argument:

```js
const Button = styled.button`
  background: ${styledMap('type', {
    primary: '#c00',
    default: '#ddd',
  })};
`;
```

`styled-map` will then look at the Button's `type` prop for a matching value.

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

## 😎

> Note: importing `as theme` is optional, but it reads a lot better!

## License

MIT Copyright 2017
