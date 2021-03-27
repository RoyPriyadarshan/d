import React from 'react'
import { TextField, Select, MenuItem, InputLabel, FormControl, TextareaAutosize } from '@material-ui/core'
import classes from './Input.module.css'

const Input = (props) => {

    let inputElement = null
    let validationError = null

    const inputClasses = [classes.InputElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationMessage}>* Please enter a <strong>valid data !</strong> *</p>
    }

    if (props.fielder === 'email' && props.touched) {
        let validationEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if (!validationEmailRegex.test(props.value)) {
            validationError = <p className={classes.ValidationMessage}>* Please enter a <strong>valid Email-ID !</strong> *</p>
        }
    }

    if (props.fielder === 'name' && props.touched && props.value.length >= 20) {
        validationError = <p className={classes.ValidationMessage}>* Name length <strong>Exceeded limit !</strong> *</p>
    }

    if(props.fielder==='phone'&&props.touched&&props.value.length!==10){
        validationError = <p className={classes.ValidationMessage}>* Phone number should have <strong>10 Numbers !</strong> *</p>
    }

    if(props.fielder==='bio'&&props.touched && props.value.split(' ').length>60){
        validationError = <p className={classes.ValidationMessage}>* Word limit <strong>Exceeded ! Total words should be less than 60 </strong> *</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <FormControl fullWidth>
                <TextField
                    style={{ marginBottom: '25px' }}
                    variant='outlined'
                    label={props.label}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig} value={props.value}
                    onChange={props.changed} />
            </FormControl>
            break
        case ('textarea'):
            inputElement = <FormControl fullWidth>
                <TextareaAutosize
                    rowsMin={4}
                    style={{ marginBottom: '25px' }}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig} value={props.value}
                    onChange={props.changed} />
            </FormControl>
            break
        case ('select'):
            inputElement = (
                <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map((option) => {
                            return (
                                <MenuItem key={option.value} value={option.value} disabled={props.disabled}>{option.displayValue}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            )
            break
        default:
            inputElement = <FormControl>
                <TextField
                    variant='outlined'
                    label={props.label}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig} value={props.value}
                    onChange={props.changed} />
            </FormControl>
    }

    return (
        <div>
            {inputElement}
            {validationError}
        </div>
    )
}

export default Input
