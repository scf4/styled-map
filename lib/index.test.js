import styledMap, { mapToTheme, _convertToObject, _dotProp } from './index';

const theme = {
  buttonColor: {
    primary: '#0af',
    info: '#ff0',
    other: '#aab',
    warning: '#c00',
  },
};

const nestedTheme = {
  button: {
    foreground: {
      primary: '#0af',
      default: '#fff',
    },
  },
};

const props = { theme };

const styles = {
  primary: '#0af',
  warning: '#c00',
  lastItem: '#c0c',
};

const stylesTTL = _convertToObject`
  primary: #0af;
  warning: #c00;
  lastItem: #c0c;
`(props);

const stylesWithDefault = {
  default: '#c0c',
  primary: '#0af',
  warning: '#c00',
};

const stylesWithDefaultTTL = _convertToObject`
  default: #c0c;
  primary: #0af;
  warning: #c00;
`(props);

describe('styledMap', () => {
  it('returns a function', () => {
    const map = styledMap();
    expect(typeof styledMap()).toBe('function');
  });

  it('returns a matching prop from a component', () => {
    const result = styledMap(styles)({
      primary: true,
      other: 'blah',
    });
    expect(result).toEqual(styles['primary']);
  });

  it('returns the last matching', () => {
    const result = styledMap(styles)({
      primary: true,
      warning: true,
      yellow: true,
    });
    expect(result).toEqual(styles['warning']);
  });

  it('returns the default prop if nothing matches', () => {
    const result = styledMap(stylesWithDefault)({
      other: 'blah',
      another: 'blah',
    });
    expect(result).toEqual(stylesWithDefault['default']);
  });

  it('returns the last prop if no default is specified', () => {
    const result = styledMap(styles)({
      other: 'blah',
      another: 'blah',
    });
    expect(result).toEqual(styles['lastItem']);
  });

  it('ignores falsey props', () => {
    const result = styledMap(stylesWithDefault)({
      primary: false,
      warning: null,
      other: 'blah',
    });
    expect(result).toEqual(stylesWithDefault['default']);
  });

  it('uses prop values instead of keys if the first arg is a string', () => {
    const result = styledMap('type', styles)({
      type: 'primary',
      other: 'blah',
    });
    expect(result).toEqual(styles['primary']);
  });

  it('handles css syntax', () => {
    const result = styledMap`
      first: #0af;
      second: 13px;
    `({
        first: true,
      });
    expect(result).toBe('#0af');

    const result2 = styledMap`
      first: #0af;
      second: 13px;
    `({});
    expect(result2).toBe('13px');
  });

  it('css syntax handles missing final semicolon and whitespace', () => {
    const result = styledMap`
          first: #0af;

        second: 100%  
        
    `({
        second: true,
      });
    expect(result).toBe('100%');
  });
});
  

describe('mapToTheme', () => {
  it('correctly maps theme to props', () => {
    const result = mapToTheme('buttonColor')({ theme })({
      primary: false,
      info: true,
    });
    expect(result).toEqual('#ff0');
  });
  it('supports nested object properties', () => {
    const result = mapToTheme('button.foreground')({ theme: nestedTheme })({
      primary: true,
    });
    expect(result).toEqual(_dotProp('button.foreground.primary', nestedTheme));
  });
  it('uses the prop value when passed a second argument', () => {
    const result = mapToTheme('buttonColor', 'kind')({theme})({
      kind: 'other'
    });
    expect(result).toEqual('#aab');
  })
});

describe('_convertToObject', () => {
  it('converts the css-like syntax to a style object', () => {
    expect(stylesTTL).toMatchObject(styles);
    expect(stylesWithDefaultTTL).toMatchObject(stylesWithDefault);
  });
});

describe('dotProp', () => {
  it('parses the string and returns the correct value', () => {
    const obj = {
      first: {
        second: {
          third: {
            fourth: 'it works'
          },
        },
        lorem: {
          ipsum: 'dolor sit amet',
        }
      },
      foo: {
        blah: null,
      }
    };
    const result = _dotProp('first.second.third.fourth', obj);

    expect(result).toEqual('it works');
  });
});
