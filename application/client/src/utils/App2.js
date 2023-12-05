// App2.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './path-to-your-redux-store'; // Update the path accordingly
import CustomerProfile from './path-to-CustomerProfile'; // Update the path accordingly

const App2 = () => {
  return (
    <Provider store={store}>
      <CustomerProfile />
      {/* Other components */}
    </Provider>
  );
};

export default App2;
