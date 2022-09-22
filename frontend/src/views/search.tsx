import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/Form';

export interface SearchProps {
    filter: (value: string) => void;
}

function FormTextExample(props: SearchProps) {
    const { filter } = props;
    return (
        <InputGroup
            className='search'
        >
            <Form.Control
                id="inputPassword5"
                placeholder='Search for contact by name'
                onChange={(e) => {
                    filter(e.target.value)
                }}
            />
        </InputGroup>
    );
}

export default FormTextExample;