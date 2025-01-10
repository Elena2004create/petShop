import CartList from '../components/CartList.js'
import { Container } from 'react-bootstrap'

const Cart = () => {
    return (
        <Container>
            <h1>Корзина</h1>
            <CartList />
        </Container>
    )
}

export default Cart