import { useEffect } from 'react';
import Router from './router/Router';
import { getUserData } from './utility/Utils';

const App = () => {
  const user = getUserData();

  useEffect(() => {
    if (user && user.user && user.user.ability) {
      ability.update(user.user.ability);
    }
  }, [user]);

  return <Router />;
};

export default App;
