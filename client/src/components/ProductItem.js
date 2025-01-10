import { Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProductItem = ({ data }) => {
    const navigate = useNavigate()
    
    return (
        <Col xl={3} lg={4} sm={6} className="mt-3" onClick={() => navigate(`/product/${data.id}`)}>
            <Card style={{ width: '250px', height: '350px', cursor: 'pointer' }}>
                <Card.Img 
                    variant="top" 
                    src={data.image ? process.env.REACT_APP_IMG_URL + data.image : "http://via.placeholder.com/200"} 
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body style={{ height: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <p>Бренд: {data.brand.name}</p>
                    <strong>{data.name}</strong>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductItem
