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

const Button = styledbutton`
    color: ${buttonColor};
    border: 2px solid ${buttonColor};
`;
```

Yay!

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
