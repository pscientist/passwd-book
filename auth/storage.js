import * as SecureStore from 'expo-secure-store';

const authToken = 'passwdBookToken';

const storeToken = async (value) => {
    try {
        await SecureStore.setItemAsync(authToken, value);

    } catch (e) {
        console.log('Error storing ' + value);
        console.log(e);
    }
}

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(authToken);

    } catch (e) {
        console.log('Error getting value from the authToken ' + authToken);
        console.log(e);
    }
}

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(authToken);

    } catch (e) {
        console.log('Error removing value from the authToken ' + authToken);
        console.log(e);
    }
}

export default { authToken, storeToken, getToken, removeToken };