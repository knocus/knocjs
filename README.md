### CAUTION: Work in progress. Not stable.

## Knoc
A bell like plugin for authentication with Hapi.js, with the freedom of custom
handler logic.
Supports
-[x] Facebook

## Installation
```sh
npm install knoc --save
yarn add knoc
```
## Usage
```typescript
// facebook oauth
import {fb, FacebookConfig} from 'knoc';
import config '/path/to/my/config';

const fbHandler = async (req, h) => {
  const token = request.payload.token;
  // Pass in the config
  const fbConfig:FacebookConfig = config.facebook;
  return data = await fb.validate(token, fbConfig);
}
```
