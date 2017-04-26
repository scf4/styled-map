import styledMap from './index';

const styles = {
  primary: '#0af',
  warning: '#c00',
  default: '#aab',
};

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
        other: 'blah',
      });
      expect(result).toEqual(styles['warning']);
    });

    it('returns the last prop as default', () => {
      const result = styledMap(styles)({
        other: 'blah',
        another: 'blah',
      });
      expect(result).toEqual(styles['default']);
    });

    it('ignores falsey props', () => {
      const result = styledMap(styles)({
        primary: false,
        warning: null,
        other: 'blah',
      });
      expect(result).toEqual(styles['default']);
    });
  });
});
