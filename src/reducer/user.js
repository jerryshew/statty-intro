import uuidv1 from 'uuid/v1'
import {
    DELETE_USER,
    CREATE_USER,
    UPDATE_USER,
    SHOW_EDIT_USER,
    SHOW_CREATE_USER,
    HIDE_CREATE_USER,
    UPDATE_USER_FORM,
} from '../common/contentType';

const defaultUpdateUser = {
    sex: 'female',
    age: '',
    name: '',
    id: '',
}

export default (state, action) => {
    switch (action.type) {
        // delete user
        case DELETE_USER:
            if (!action.user || !action.user.id) {
                return state
            }
            return Object.assign({}, state, {
                users: state.users.filter(u => u.id !== action.user.id)
            })
        // show create user form
        case SHOW_CREATE_USER:
            return Object.assign({}, state, {
                showCreate: true,
                updateUser: defaultUpdateUser
            })
        // hide create user form
        case HIDE_CREATE_USER:
            return Object.assign({}, state, {
                showCreate: false
            })
        // update user form field value
        case UPDATE_USER_FORM:
            let { updateUser } = state
            let newUpdateUser = Object.assign({}, updateUser, action.user)
            return Object.assign({}, state, { updateUser: newUpdateUser })
        // create user
        case CREATE_USER:
            let newUserState = {
                users: state.users.concat(Object.assign({ id: uuidv1() }, state.updateUser)),
                updateUser: defaultUpdateUser,
                showCreate: false,
            }
            return Object.assign({}, state, newUserState)
        // show edit user form
        case SHOW_EDIT_USER:
            return Object.assign({}, state, { updateUser: action.user, showCreate: true })
        // update user
        case UPDATE_USER:
            let newUsers = state.users.map(item => {
                return item.id === state.updateUser.id ? Object.assign({}, state.updateUser) : item
            })
            return Object.assign({},
                state, {
                    users: newUsers,
                    updateUser: defaultUpdateUser
                })
        default:
            return state
    }
}