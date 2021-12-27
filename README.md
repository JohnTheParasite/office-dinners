# office-dinners

### Use prettier

Config WebStorm to fix file with prettier on save.

### Auth Service

Installed as plugin. Using in components: `this.$authService`

### Store

Installed as plugin. Using in components: `this.$store`

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Components
### Toast
```
example: this.$store.commit("notifications/addNotification", Toast)

Toast - object;
Toast.type - type of the toast, default type is "default"
Toast.timeout - ms to disappearing, default "5000"
Toast.autoClose - auto closing toast after timeout. default "True"
Toast.messageLabel - Header of the toast message, would be filled by type if prop is empty
Toast.message - Toast message, default is empty.

Also Toast could be just an message, other properties would be set by default.

For Danger notification could be used addDangerNotification function:
example: this.$store.commit("notifications/addDangerNotification", "Danger! dangeeer!")
```


### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
