import * as React from 'react';
import { io } from 'socket.io-client';

const Socket = io(process.env.REACT_APP_SOCKET_URL);

interface SocketContextProps {
	Socket?: typeof Socket;
}

const SocketContext = React.createContext<SocketContextProps>({});

interface ISocketStateProps {
	children: React.ReactNode;
}

const SocketState: React.FC<ISocketStateProps> = props => {
	return <SocketContext.Provider value={{ Socket }}>{props.children}</SocketContext.Provider>;
};

export default SocketState;

export const useSocket = () => React.useContext(SocketContext);
