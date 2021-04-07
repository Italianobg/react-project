import { useContext } from 'react';
import { APIUserContext } from '../../provider/APIUserProvider/'

function useAPIError() {
    const { user, addUser, removeUser } = useContext(APIUserContext);
    return { user, addUser, removeUser };
}

export default useAPIError;