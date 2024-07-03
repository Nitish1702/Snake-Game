import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/index.tsx';
import { ChakraProvider, Container, Heading, chakra } from '@chakra-ui/react';
import CanvasBoard from './components/CanvasBoard.tsx';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Container maxW="container.lg" centerContent>
          <Heading as='h1' size='xl'>Snake Game</Heading>
          <CanvasBoard height={600} width={1000} />
        <div></div>
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
