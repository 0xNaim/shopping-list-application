import { StoreProvider } from 'easy-peasy';
import store from '../store';
import AppRouter from './Route';

const App = () => {
  return (
    <StoreProvider store={store}>
      <AppRouter />
    </StoreProvider>
  );
};

export default App;
