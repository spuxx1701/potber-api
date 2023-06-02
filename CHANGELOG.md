# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [1.2.0] - unreleased

### Added

- Added /privateMessages annd /privateMessages/:id GET routes.
- Added /users/:id route.
- Added /healthz route for kubernetes.

### Changed

- The API now outputs all avatar URLs as absolute URLs.
- The application was moved to a kubernetes environment. By that, the application gained several beneficial features like high availability or rolling updates.
- Deployment is now handled via Flux GitOps pipelines. Prior environments have been replaced with a staging and a production environment. Deployment to staging is triggerd via commits to master. Deployment to production is triggered via releasing semantic versioning tags.

## [1.1.0] - 2023-04-01

### Added

- Session now includes active avatar URL.

### Fixed

- More fixes and improvements regarding encoding/decoding. Deprecated functions escape() and unescape() are no longer being used.
- Fixed an issue with the 'updateBoolean' query parameter not working properly on /thread/:id.

## [1.0.1] - 2023-03-09

### Fixed

- Some fixes and improvements regarding encoding/decoding. Users with certain special characters should now be able to log in.

## [1.0.0] - 2023-02-19

### Initial release.
