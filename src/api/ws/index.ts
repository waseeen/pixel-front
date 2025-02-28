import env from '../../utils/env';

const socket = new WebSocket(env.wsUrl);

export default socket;
