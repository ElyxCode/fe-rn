## React Native Project FR-RN

## Step 1

Install dependences

```bash
yarn install
```
## Step 2
rename .env.development.example for .env.development and 
.env.production.example for .env.production set enviroment variables

## Step 3: Start your Application

### For Android debug

### Mode dev
```bash
# using Yarn
yarn android:dev
```

### Mode prod
```bash
# using Yarn
yarn android:prod
```

### For iOS debug

### Mode dev
```bash
# using Yarn
# use every time you change environment
yarn ios:Pod:Reset
# then
yarn ios:dev
```

### Mode prod
```bash
# using Yarn
# use every time you change environment
yarn ios:Pod:Reset
# then
yarn ios:prod
```

### Release Bundle

### Android
```bash
# usign yarn
# apk-env-dev
yarn android:dev-apk
# apk-env-prod
yarn android:prod-apk
# aab
yarn android:bundle
```

### iOS
```bash
# usign yarn
# env-dev
yarn ios:Pod:Reset
yarn ios:dev-release
# apk-env-prod
yarn ios:Pod:Reset
yarn ios:prod-release
```

### Clean projects 
```bash
# android
yarn android:clean

# iOS
yarn ios:clean
``` 

