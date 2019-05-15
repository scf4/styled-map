/* TODO: This code is due for some refactoring when I get some spare time
 * We've built up a little technical debt by adding the new syntax while still
 * using the old code in the main function.
 * This lost us some functionality (e.g., issue #10)
 */

export const _convertToObject = (text, ...vars) => props => {
  const parsedTags = text.reduce((acc, item, i) => {
    let v = vars[i] || '';

    // If it's a function, call it with props
    if (typeof v === 'function') v = v(props);

    // Merge with the rest
    return acc + item + v;
  }, '');

  const rules = parsedTags
    .split(';')
    .map(item => item.trim())
    .filter(item => !!item);

  // Create and return the object
  return rules.reduce((acc, item) => {
    const [key, val] = item.split(':').map(i => i.trim());
    return Object.assign(acc, { [key]: val });
  }, {});
};

const styledMap = (...args) => (props) => {
  let mapOfStyles;

  if (Array.isArray(args[0])) {
    // Are we using a tagged template literal?
    mapOfStyles = _convertToObject(...args)(props);
  } else {
    // Regular object usage:
    mapOfStyles = args[args.length - 1];
  }

  const styleKeys = Object.keys(mapOfStyles);

  // If the first argument is a string, styled-map works differently:
  if (typeof args[0] === 'string') {
    // We use the value of a prop, rather than the key
    const val = props[args[0]];
    
    if (mapOfStyles[val]) return mapOfStyles[val];
  } else {
    // Otherwise we do things the normal way:
    const matchingKeys = styleKeys.filter(key => props[key]);

    // If we have a matching key, return it (or the last if we have multiple):
    if (matchingKeys.length) return mapOfStyles[matchingKeys.pop()];
  }

  // If nothing has matched so far, look for a "default" item in our map:
  if (Object.prototype.hasOwnProperty.call(mapOfStyles, 'default')) {
    return mapOfStyles.default;
  }

  // Else just return the last item, whatever it is:
  return mapOfStyles[styleKeys.pop()];
};


export const _dotProp = (string, object) => string
  .split('.')
  .reduce((acc, key) => acc[key], object);

export const mapToTheme = (key, prop) =>
  (props) => prop ? styledMap(prop, _dotProp(key, props.theme)) : styledMap(_dotProp(key, props.theme));

export default styledMap;
