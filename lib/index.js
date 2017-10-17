import get from 'get-value';

const styledMap = (...args) => (props) => {
  const mapOfStyles = args[args.length - 1];
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

export const mapToTheme = (key) =>
  (props) => styledMap(get(props.theme, key));

export default styledMap;
