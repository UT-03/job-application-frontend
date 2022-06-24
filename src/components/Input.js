import React, { useReducer, useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Select from 'react-select';

import { validate } from '../util/validators';
import addIcon from '../assets/images/addIcon.svg';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

const Input = (props) => {
    const [multiInputData, setMultiInputData] = useState(props.initialValue || ['']);

    const [multiSelect, setMultiSelect] = useState(null);

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || (props.element === 'multi-input' ? [''] : ''),
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        if (onInput)
            onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (event, index) => {
        let val = event.target.value;

        if (event.target.type === 'checkbox')
            val = event.target.checked;

        if (props.type === 'file')
            val = event.target.files[0];

        if (props.element === 'multi-input') {
            const multiInputData$ = [...multiInputData];
            multiInputData$[index] = event.target.value;
            setMultiInputData(() => multiInputData$);
            val = multiInputData$;
        }

        dispatch({
            type: 'CHANGE',
            val: val,
            validators: props.validators
        });

        if (props.onChange)
            props.onChange(val);
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const isInputInvalid = !inputState.isValid && inputState.isTouched;

    let element;
    switch (props.element) {
        case 'input':
            element = <Form.Group className='mb-4'>
                <Form.Label className={`${isInputInvalid && "text-danger"}`}>{props.label}</Form.Label>
                <Form.Control
                    className={`${isInputInvalid && "invalid border border-danger"}`}
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                    disabled={props.disabled} />
                {!inputState.isValid && inputState.isTouched && (
                    <Form.Text className="text-danger d-block">{props.errorText || 'This field is required.'}</Form.Text>
                )}
                <Form.Text className="text-muted">{props.extraText}</Form.Text>
            </Form.Group>
            break;
        case 'file':
            element = <Form.Group className='mb-4'>
                <Form.Label className={`${isInputInvalid && "text-danger"}`}>{props.label}</Form.Label>
                <Form.Control
                    className={`${isInputInvalid && "invalid border border-danger"}`}
                    id={props.id}
                    type="file"
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    disabled={props.disabled}
                    ref={props.reference} />
                {!inputState.isValid && inputState.isTouched && (
                    <Form.Text className="text-danger d-block">{props.errorText || 'This field is required.'}</Form.Text>
                )}
                <Form.Text className="text-muted">{props.extraText}</Form.Text>
            </Form.Group>
            break;
        case 'textarea':
            element = <Form.Group className='mb-4'>
                <Form.Label className={`${isInputInvalid && "text-danger"}`}>{props.label}</Form.Label>
                <Form.Control
                    className={`${isInputInvalid && "invalid border border-danger"}`}
                    as="textarea"
                    id={props.id}
                    rows={props.rows || 3}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                    disabled={props.disabled} />
                {!inputState.isValid && inputState.isTouched && (
                    <Form.Text className="text-danger d-block">{props.errorText || 'This field is required.'}</Form.Text>
                )}
                <Form.Text className="text-muted">{props.extraText}</Form.Text>
            </Form.Group>
            break;
        case 'select':
            element = <Form.Group className="mb-4">
                <Form.Label className={`${isInputInvalid && "text-danger"}`}>{props.label}</Form.Label>
                <Form.Select
                    className={`${isInputInvalid && "invalid border border-danger"}`}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                    disabled={props.disabled}
                >
                    <option value="">{props.defaultOption}</option>
                    {props.options.map((option, index) => <option key={index}>{option}</option>)}
                </Form.Select>
                {!inputState.isValid && inputState.isTouched && (
                    <Form.Text className="text-danger d-block">{props.errorText || 'This field is required.'}</Form.Text>
                )}
                <Form.Text className="text-muted">{props.extraText}</Form.Text>
            </Form.Group>
            break;
        case 'multi-select':
            element = <Form.Group className="mb-4">
                <Form.Label className={`${isInputInvalid && "text-danger"}`}>{props.label}</Form.Label>
                <Select
                    defaultValue={props.initialValue}
                    onChange={props.setSelected}
                    options={props.options}
                    isMulti={true}
                    allowSelectAll={true}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={true}
                    placeholder={props.defaultOption}
                    noOptionsMessage={props.noOptionsMessage}
                />
                {/* <Form.Select
                    className={`${isInputInvalid && "invalid border border-danger"}`}
                    multiple={true}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    disabled={props.disabled}
                >
                    {props.options.map((option, index) => <option key={index}>{option}</option>)}
                </Form.Select> */}
                {!inputState.isValid && inputState.isTouched && (
                    <Form.Text className="text-danger d-block">{props.errorText || 'This field is required.'}</Form.Text>
                )}
                <Form.Text className="text-muted">{props.extraText}</Form.Text>
            </Form.Group>
            break;
        case 'checkbox':
            element = <Form.Check
                className='mb-4'
                type={props.type}
                label={props.label}
                checked={props.checked}
                defaultChecked={props.defaultChecked}
                onClick={(e) => props.onClick(e.target.checked)}
                disabled={props.disabled}
            />
            break;
        case 'multi-input':
            element = <Form.Group className='mb-4'>
                <Form.Label>{props.label}</Form.Label>
                {multiInputData.map((el, index) => (
                    <Container key={index} className="d-flex align-items-center py-1">
                        <Form.Control
                            className={`w-50`}
                            id={props.id + index}
                            type={props.type}
                            onChange={(e) => changeHandler(e, index)}
                            onBlur={touchHandler}
                            value={el}
                            disabled={props.disabled} />
                        {index === multiInputData.length - 1 && (
                            <Image
                                className="mx-1"
                                src={addIcon}
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer",
                                    filter: 'invert(74%) sepia(1%) saturate(0%) hue-rotate(154deg) brightness(94%) contrast(91%)'
                                }}
                                onClick={() => {
                                    const multiInputData$ = [...multiInputData];
                                    multiInputData$.push(['']);
                                    setMultiInputData(multiInputData$);
                                }} />
                        )}
                    </Container>
                ))}
                <Form.Text className="text-muted">{props.extraText}</Form.Text>
            </Form.Group>
            break;
    }
    return (
        <React.Fragment>
            {element}
        </React.Fragment>
    );
};

export default Input;

