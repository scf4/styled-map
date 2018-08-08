import styledMap, { mapToTheme, _convertToObject } from './index';

const theme = {
  buttonColor: {
    primary: '#0af',
    info: '#ff0',
    other: '#aab',
    warning: '#c00',
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

describe('_convertToObject', () => {
  it('converts the css-like syntax to a style object', () => {
    expect(stylesTTL).toMatchObject(styles);
    expect(stylesWithDefaultTTL).toMatchObject(stylesWithDefault);
  });
});

describe('styledMap', () => {
  it('returns a function', () => {
    const map = styledMap();
    expect(typeof styledMap()).toBe('function');
  });

  describe('when called on a component:', () => {
    it('returns a matching prop', () => {
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
});

describe('mapToTheme', () => {
  it('correctly maps theme to props', () => {
    const result = mapToTheme('buttonColor')({ theme })({
      primary: false,
      info: true,
    });
    expect(result).toEqual('#ff0');
  });
});
