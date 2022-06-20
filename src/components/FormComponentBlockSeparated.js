import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import { useForm } from '../hooks/FormHook';
import Input from './Input';
import BoxSeperator from './BoxSeperator';

const FormComponentBlockSeparated = (props) => {
    const formObj = { ...props.formObj };

    const formStateObj = {};
    for (const groupKey in formObj) {
        for (const key in formObj[groupKey]) {
            formStateObj[key] = formObj[groupKey][key].formState;

            formObj[groupKey][key].props = {
                ...formObj[groupKey][key].props,
                id: `${key}`
            }
        }
    }

    const [formState, inputHandler] = useForm(formStateObj, props.initialValid);
    return (
        <Container>
            <Form
                className="w-75 mx-auto"
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit(formState);
                }}>
                {Object.values(formObj).map((grp, index) => {
                    return (
                        <BoxSeperator
                            key={index}
                            heading={props.headings[index]}
                        >
                            {Object.values(grp).map(inp => (
                                <Input
                                    key={inp.props.id}
                                    {...inp.props}
                                    initialValue={inp.formState ? inp.formState.value : ''}
                                    initialValid={inp.formState ? inp.formState.isValid : ''}
                                    onInput={inputHandler}
                                />
                            ))}
                        </BoxSeperator>
                    )
                })}

                {props.children}

                <Button
                    type="submit"
                    disabled={!formState.isValid || props.disableSubmitButton}>
                    {props.disableSubmitButton && (
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    )}
                    {props.submitButtonLabel}
                </Button>
            </Form>
        </Container>
    );
};

export default FormComponentBlockSeparated;