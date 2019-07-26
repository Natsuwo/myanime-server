export default {
    async loginActions(context, payload) {
        context.commit('login', payload)

        setTimeout(() => {
            context.commit('loading', false)
        }, 500);

    }
}