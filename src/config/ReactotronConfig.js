import Reactotron from 'reactotron-react-native';

if(__DEV__) {
    const tron = Reactotron.configure({ host: '192.168.15.110' })
        .useReactNative()
        .connect();

    console.tron = tron;

    tron.clear(); // limpa a timeline toda vez que da um refresh na aplicação, se nao quiser, comenta
}