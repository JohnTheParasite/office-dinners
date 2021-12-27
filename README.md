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
example: this.$store.commit("toasts/addToast", Toast)

Toast - {
    type: SystemTypes default  SystemTypes.DEFAULT,
    timeout: Number default 5000
    autoClose: Boolean default true
    header: String, would be filled by type if prop is empty
    message: String
}

Also Toast could be just an message, other properties would be set by default.

For Danger notification could be used addDangerToast function:
example: this.$store.commit("toasts/addDangerToast", "Danger! dangeeer!")
```


### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
