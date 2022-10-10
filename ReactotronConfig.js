import Reactotron from 'reactotron-react-native';

import Storage from 'react-native-encrypted-storage';

Reactotron.setAsyncStorageHandler(Storage).configure().useReactNative().connect();
