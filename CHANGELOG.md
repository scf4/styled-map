# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2017-07-02
### Changed
- `styled-map` now looks for a "default" key if there are no matches. Otherwise it will use the last item in the map as in previous versions.

### Added
- Sometimes you want to use the value of a prop instead of its name, like `<Button type="primary" />`. You can use `styled-map` this way by providing a string as the first argument. E.g., `styledMap('type', { ... })`.
