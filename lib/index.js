export const _convertToObject = (text = undefined, ...vars) => props => {
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

const handleMapping = (enumName = undefined, isObject = undefined) => (...args) => props => {
  // If we are using a tagged template literal, convert it to a object
  const mapOfStyles = isObject
    ? args[args.length - 1]
    : _convertToObject(...args)(props);

  const styleKeys = Object.keys(mapOfStyles);

  // If the first argument is a string, styled-map works differently:
  if (enumName !== undefined) {
    // We use the value of a prop, rather than the key
    const val = props[enumName];

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

const styledMap = (...args) => {
  // If the function looks like: styledMap`styles`
  if (Array.isArray(args[0])) {
    return handleMapping(undefined, false)(...args);
  }

  if (typeof args[0] === 'string') {
    // If the function looks like: styledMap(prop)`styles`
    if (args.length === 1) return handleMapping(...args);

    // If the function looks like: styledMap(prop, {styles})
    return handleMapping(args[0], true)(...args);
  }

  // Otherwise the function looks like: styledMap({styles})
  return handleMapping(undefined, true)(...args);
};

export const _dotProp = (string, object) => string
  .split('.')
  .reduce((acc, key) => acc[key], object);

export const mapToTheme = (key) =>
  (props) => styledMap(_dotProp(key, props.theme));

export default styledMap;
