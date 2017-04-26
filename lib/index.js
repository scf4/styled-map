const styledMap = (mapOfStyles) => (props) => {
  const keys = Object.keys(mapOfStyles);
  const matchingKeys = keys.filter(key => props[key]);
  // If there's no match, default to the last key in the map.
  if (matchingKeys.length < 1) {
    const lastKey = keys[keys.length - 1];
    return mapOfStyles[lastKey];
  }
  // Or take the matching key (last if there are multiple)
  const lastMatchingKey = matchingKeys[matchingKeys.length - 1];
  return mapOfStyles[lastMatchingKey];
};

export const mapToTheme = (key) =>
  (props) => styledMap(props.theme[key])

export default styledMap;
