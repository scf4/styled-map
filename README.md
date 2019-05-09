<br /><div align="center">
  
<img src="https://i.imgur.com/IQ37K7m.png" width="249px" /><br />
<br />
  
**A better way to map props to styles**

**Simple CSS-like syntax, for Styled Components and Emotion**

<br />

<a href="https://www.npmjs.com/package/styled-map" target="_blank"><img src="https://img.shields.io/badge/dynamic/json.svg?label=downloads&url=https%3A%2F%2Fapi.npmjs.org%2Fdownloads%2Fpoint%2F2017-01-01%3A2021-01-01%2Fstyled-map&query=downloads&colorB=blue" alt="Total downloads" height="20px" width="114px" /></a> <a href="https://github.com/scf4/styled-map/stargazers"><img src="https://img.shields.io/github/stars/scf4/styled-map.svg" alt="GitHub Stars" height="20px" style="min-width: 68px" /></a> <a href="#"><img src="https://img.shields.io/bundlephobia/minzip/styled-map.svg" alt="Bundle size" height="20px" style="min-width: 132px" /></a> <a href="#"><img src="https://img.shields.io/packagist/l/doctrine/orm.svg" alt="MIT License" height="20px" width="78px" /></a><br /><br /><br />

</div>

## Example

<div style="width: 100%">
  <img src="https://i.imgur.com/aohFk5k.png" style="max-width: 100%; max-height: auto;" width="522px" />
<div>


## Install
`yarn add styled-map`

or

`npm install styled-map --save`

## Why use Styled Map?

Styled Map simplifies your components' CSS, making your code cleaner and clearer wherever you use props to alter styles.

### Without Styled Map
With Styled Components alone, you'll often do something like this:

```js
const Button = styled.button`
  color: ${props => props.primary ? '#0c0' : '#ccc'};
`;

 ```

 but this quickly turns messy:

 ```js
const Button = styled.button`
  color: ${props =>
    props.primary && '#0c0' ||
    props.warning && '#c00' ||
    props.info && '#0cc' ||
    '#ccc'
  };
  border: 2px solid ${props =>
    props.primary && '#0c0' ||
    props.warning && '#c00' ||
    props.info && '#0cc' ||
    '#ccc'
  };
  font-size: ${props =>
    props.small && '8px' ||
    props.medium && '18px' ||
    props.large && '32px' ||
    '16px'
  };
`;

<Button primary large>Submit</Button>
 ```

### With Styled Map
Here's the same component using `styled-map`:

```js
import styledMap from 'styled-map';

const buttonColor = styledMap`
  primary: #0c0;
  warning: #c00;
  info: #0cc;
  default: #ccc;
`;

const Button = styled.button`
  color: ${buttonColor};
  border: 2px solid ${buttonColor};
  font-size: ${styledMap`
    large: 32px;
    small: 8px;
    medium: 18px;
    default: 16px;
  `};
`;

<Button primary large>Submit</Button>

```

Much better! 

> Note: If there are no matching props, styled-map will look for a "default" item in your map. If it doesn't find one it will use the last item by default.

## What's with the pseudo-CSS syntax?

Until v3.0, Styled Map used JavaScript objects <a href="https://gist.github.com/scf4/4498561f2f38a82b7525be2b4bc94a61" target="_blank">like this</a>. [Read more about the decision to use a new syntax](https://github.com/scf4/styled-map/issues/7).

You can still use objects if you prefer, and there are currently no plans to deprecate this option.

## Usage with themes

Styled Map makes mapping to themes incredibly easy with the `mapToTheme` function.

Simply set up your themes like this:

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
import styledMap, { mapToTheme as theme } from 'styled-map';

const Button = styled.button`
  color: ${theme('buttonColor')};
  border: 2px solid ${theme('buttonColor')};
`;

```

> Note: importing `as theme` is optional, but it reads a lot better!

### Nested theme objects

Nested objects can be refered to with dots, so you can write `theme('colors.button')` if your theme looks like this:

```js
const theme = {
  colors: {
    button: {
      primary: '#b00',
      info: '#0b0',
      etc: '#00f',
    }
  }
}
```

## Optionally mapping to prop values 

Sometimes you'll want to map styles to the *value* of a prop instead of using prop keys. This is especially useful if you have something like a `type` variable to pass to your component and you don't want to do something like `<Button {...{[type]:true}} />`.

You can use `styled-map` in these situations by simply passing a prop name as the first argument. 

```js
const Button = styled.button`
  background: ${styledMap('type', {
    primary: '#c00',
    default: '#ddd',
  })};
`;
```

`styled-map` will then look at the Button's `type` prop for a matching value.

This also works in `mapToTheme`:
```js
import styledMap, { mapToTheme as theme } from 'styled-map';

const myTheme = {
  buttonColor: {
    primary: 'orange',
    warning: 'red',
    info: 'blue',
    default: 'white',
  },
  ...
};

const Button = styled.button`
  color: ${theme('buttonColor', 'kind')};
`;

<Button kind='warning'>Click</Button> // will be red
```

**Note: This currently doesn't work doesn't work with the pseudo-CSS syntax. This functionality should arrive by v4.0. PRs welcome!**:

## Typings

We currently have TypeScript typings in release candidate stage @ `3.2.0-rc.1`. Please upgrade specifically to `styled-map@3.2.0-rc.1` if you want typings now. 



## License

MIT Copyright 2017–2018
