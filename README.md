# parcel app

### [DEMO LINK](https://nazarmatsevych.github.io/simple-weather-app/)

### This application allows users to create requests for parcel transportation or delivery services to other users.

Main Pages:
/<id>/create: Select the type of request (order or deliver).
/<id>/create/order: Create an order request.
/<id>/create/deliver: Create a delivery request.
/<id>/requests: List of all user requests.
/requests: List of all requests.
/<id>: Redirects to /<id>/requests.
<id>: Identifies the user, and requests are associated with this parameter.

## Technologies

* Vue 3 composition API
* Vue Router
* Element plus
* Pinia
* Tailwindcss
* Typescript


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
