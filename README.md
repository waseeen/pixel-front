# Waseeen's Pixel Battle

Another pixel battle game

This is the frontend part of the [Waseeen's Pixel Battle](https://pb.waseeen.ru).

## Configuration

Before running the app, you need to set the following environment variables:

- `VITE_BACKEND_URL`: the URL of the backend server
- `VITE_WS_URL`: the URL of the WebSocket server (probably same as `VITE_BACKEND_URL`, but with `wss://|ws://` prefix)
- `VITE_VK_APP_ID`: the ID of the VK app. Learn more at <https://dev.vk.com/ru/vkid>
- `VITE_REDIRECT_URL`: the URL to redirect to after login (probably `VITE_BACKEND_URL`/login)

## Dependencies

The app uses the following dependencies:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Jotai](https://jotai.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Vite](https://vitejs.dev/)

## Using the app

Install the dependencies

```bash
npm ci
```

Run the development server:

```bash
npm run dev
```

Build the app for production:

```bash
npm run build
```

Run the app:

```bash
npm run preview
```
