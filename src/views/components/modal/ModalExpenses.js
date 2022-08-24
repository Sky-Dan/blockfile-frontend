// ** Reactstrap Imports
import { ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

/*style demo.scss*/


const ModalExpenses = () => {
  

  return (
    <div className='demo-inline-spacing'>
        <ModalBody>
            <h2>New Expense</h2>
            <Form className="form">
                <FormGroup>
                    <Label for="Value">Value:</Label>
                    <Input type="number" name="value" id="valueIncome" placeholder="$USD" min="0.01" step="0.01" />
                </FormGroup>

                <FormGroup>
                    <p><Label for="Category">Category:</Label></p>
                    <span className="form-modal"><Input type="radio" name="category" value="Axie" /> Axie</span>
                    <span className="form-modal"><Input type="radio" name="category" value="Axie" /> Axie2</span>
                    <span className="form-modal"><Input type="radio" name="category" value="Axie" /> Axie3</span>
                </FormGroup>

                <FormGroup>
                    <Label for="Category">Description:</Label>
                    <Input type="text" name="description" placeholder="Description" />
                </FormGroup>
            </Form>
        </ModalBody>
    </div>
  )
}
export default ModalExpenses
