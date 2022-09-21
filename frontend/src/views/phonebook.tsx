import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Search from './search';
import Contacts from './contacts';
import Header from './header';
import { Contact } from '../utils/types';

function ResponsiveAutoExample() {
    const contacts: Contact[] = [
        {
            contactId: 1,
            name: 'Eric Elliot',
            phone: '222-555-6575'
        },
        {
            contactId: 2,
            name: 'Steve Jobs',
            phone: '220-454-9886'
        },
        {
            contactId: 3,
            name: 'Fred Allen',
            phone: '210-657-8786'
        },
        {
            contactId: 4,
            name: 'Steve Wozniac',
            phone: '222-222-6575'
        },
        {
            contactId: 5,
            name: 'Bill Gates',
            phone: '343-222-6575'
        }
    ]

    return (
        <Container className='border rounded  container bg-light'>
            <Row>
                <Col sm={12}><Header></Header></Col>
            </Row>
            <Row>
                <Col sm={12}><Search></Search></Col>
            </Row>
            <Row>
                <Col sm={12}><Contacts contacts={contacts} /></Col>
            </Row>
        </Container>
    );
}

export default ResponsiveAutoExample;