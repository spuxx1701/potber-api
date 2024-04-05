# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [3.0.0] - 2024-04-05

### Changed

- 💥 Breaking: `POST '/threads` route now uses a different payload format.

### Fixed

- Fixed some more encoding issues only affecting private messages.

### Chores

- Bumped Dockerfile node version to 18.

## [2.3.2] - 2024-01-15

### Fixed

- Fixed a critical bug that would prevent logins.

### [2.3.1] - 2024-01-15

### Chores

- Improved how metrics are being handled and added the `http_requests_total` metric.

## [2.3.0] - 2024-01-15

### Added

- Implemented metrics endpoint for prometheus.

### Changed

- Request/response logging now utilizes both middlewares and interceptors to also log requests that were turned down (e.g. due to CORS).
- Increased the timeout value for outgoing requests to 30 seconds.

### Fixed

- Fixed some exceptions in `/threads/:id` not being documented properly.

### Chores

- CORS origins are now being logged on startup.

## [2.2.4] - 2023-12-21

### Changed

- Updated OpenAPI docs to better document certain fields of `UserResource`.

### Fixed

- Fixed typing of `SessionResource`.

### Chores

- Added support for `nvm`.

## [2.2.3] - 2023-10-19

### Fixed

- Fixed an issue that would lead to boolean string to not be cast properly by `TransformBooleanString`.

## [2.2.2] - 2023-10-29

### Changed

- When decoding a response, the decoder now attempts to automatically determine the encoding via the `Content-Type` header.

### Fixed

- Fixed an issue where the application would get confused about the session state if the user logs out globally via the forum's logout functionality.

## [2.2.1] - 2023-10-27

### Fixed

- Fixed an issue where boolean string would not be transformed properly with implicit transformation enabled.

## [2.2.0] - 2023-10-27

### Added

- Author profiles now include information about whether the author's account has been locked.
- Implemented `GET /usernames` endpoint. This endpoint returns filterable lists of usernames.
- Implemented `POST /threads` endpoint.
- Implemented `POST /privateMessages` endpoint.
- Implemented `GET /privateMessages/:id/reply` endpoint.
- Implemented `GET /privateMessages/:id/forward` endpoint.

## [2.1.0] - 2023-10-20

### Added

- Implemented `PUT /privateMessages/:id/markAsUnread` endpoint.
- Implemented `PUT /privateMessages/:id/moveToFolder` endpoint.
- Implemented `DELETE /privateMessages/:id` endpoint.
- Implemented `POST /posts/:id/report` endpoint.

### Changed

- Performance improvements: Session validation no longer triggers redundant requests. Instead, the content of the JWT is no longer being validated (only the JWT itself is being validated) and additional validation is left to `forum.mods.de`.

### Fixed

- Added missing error documentation to `/privateMessages/` endpoints.

## [2.0.2] - 2023-10-12

### Fixed

- HTML is now properly parsed when returning private message contents.

## [2.0.1] - 2023-09-05

### Fixed

- The page no longer breaks when it conains a post by a deleted user (due to that post not having an avatar).

## [2.0.0] - 2023-07-24

### Changed

- 💥 Breaking: Quoting a post now works via the `/posts/:id/quote` endpoint. The `quote` query parameter on the `/posts/:id` has been removed.
- Private messages may now include the sender's avatar URL.
- Various fixes and improvements to private messages.

## [1.4.0] - 2023-07-21

### Added

- User profiles now include information about the user account's age.

### Changed

- Improved documentation in SwaggerUI endpoint.
- Passwords may now be up to 100 characters long.

### Fixed

- Attempting to open a private message that is not within your mailbox will now return 404 instead of 500.
- Umlauts in user profiles' ranks are now being parsed properly.

## [1.3.0] - 2023-06-02

### Changed

- Node version pinned to 16.

### Fixed

- Thread titles and subtitles that include HTML entities will now be parsed properly.

## [1.2.0] - 2023-06-02

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
