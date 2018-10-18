# Changelog

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.2.0-rc.1] - 2018-10-18
### Added
- Added basic TypeScript typings

## [3.1.0] - 2018-10-13
### Added
- Added support for nested object properties in mapToTheme (Thanks to [#5](https://github.com/scf4/styled-map/pull/5))
### Changed
- Smaller bundle size (~500b)

## [3.0.0] - 2018-08-08
### Added
- Added completely new CSS-like API. You can still use style objects, but I think you'll find this is much better.

## [2.0.1] - 2017-07-07
### Fixed
- Fixed bug (thank you @linayanse)

## [2.0.0] - 2017-07-02
### Changed
- `styled-map` now looks for a "default" key if there are no matches. Otherwise it will use the last item in the map as in previous versions.

### Added
- Sometimes you want to use the value of a prop instead of its name, like `<Button type="primary" />`. You can use `styled-map` this way by providing a string as the first argument. E.g., `styledMap('type', { ... })`.
