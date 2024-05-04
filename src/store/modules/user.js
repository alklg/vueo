// user's state include Logged and user info
const state = {
    loggedIn: false,
    userInfo: {
        username: "",
        password: "",
        email: "",
    }
};

// methods on user
const mutations = {
    LOGIN(state) {
        state.loggedIn = true;
    },

    LOGOUT(state) {
        state.loggedIn = false;
        state.userInfo = {};
        localStorage.removeItem("jwtToken");
    },

    SET_USER_INFO(userInfo, state) {
        state.userInfo = userInfo;
    }
};

const actions = {
    login({commit}, jwtToken) {
        commit("LOGIN");
        localStorage.setItem("jwtToken", jwtToken);
    },
    logout({ commit }) {
        commit("LOGOUT");
    },
    setUserInfo({ commit }, userInfo) {
        commit("SET_USER_INFO", userInfo)
    }
}

export default {
    state,
    mutations,
    actions
};