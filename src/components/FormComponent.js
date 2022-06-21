import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useForm } from '../hooks/FormHook';
import Input from './Input';

const FormComponent = (props) => {
    const formObj = { ...props.formObj };

    const formStateObj = {};
    for (const key in formObj) {
        if (formObj[key].formState)
            formStateObj[key] = formObj[key].formState;

        formObj[key].props = {
            ...formObj[key].props,
            id: `${key}`
        }
    }

    const [formState, inputHandler] = useForm(formStateObj, props.initialValid);
    return (
        <Container className='my-5'>
            <Form
                className="w-75 mx-auto"
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit(formState.inputs);
                }}>
                {Object.values(formObj).map(inp => (
                    <Input
                        key={inp.props.id}
                        {...inp.props}
                        initialValue={inp.formState ? inp.formState.value : props.value}
                        initialValid={inp.formState ? inp.formState.isValid : props.valid}
                        onInput={inp.formState ? inputHandler : null} />
                ))}

                <Button type="submit" disabled={!formState.isValid || props.disableSubmitButton}>
                    {props.disableSubmitButton && (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )}
                    {props.submitButtonLabel || 'Submit'}
                </Button>
            </Form>
        </Container>
    );
};

export default FormComponent;