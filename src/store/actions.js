// import { getCart } from '../service/cart'

export default {
    addAsync(context) {
        setTimeout(() => {
            context.commit('addNums', 2)
        },2000)
    }
}