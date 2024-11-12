import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col
          xs={12}
          md={6}
          className='card p-5'
          style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}  // Light grey with 50% opacity
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer
