import React, { Component } from 'react'
import Input from '../../Components/Input/Input'
import classes from './Forms.module.css'
import { Button, Typography, Grid } from '@material-ui/core'

export default class Forms extends Component {
    state = {
        formFields: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Full-Name'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    maxLength: 20
                },
                valid: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    label: 'Phone Number'
                },
                value: '',
                touched: false,
                validation: {
                    required: false,
                    maxLength: 10,
                    minLength: 10
                },
                valid: true
            },
            bio: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Bio'
                },
                value: '',
                validation: {
                    required: false,
                },
                valid: true
            },
            dob: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    label: ''
                },
                value: '',
                touched: false,
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Email-ID'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,

                },
                valid: false
            },
            gender: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: "", displayValue: 'select', disabled: true },
                        { value: 'male', displayValue: 'Male', disabled: false },
                        { value: 'female', displayValue: 'Female', disabled: false },
                        { value: 'others', displayValue: 'Others', disabled: false },
                    ],
                    label: 'Gender',
                },
                value: '',
                touched: false,
                validation: {
                    required: true
                },
                valid: false
            }
        },
        formIsValid: false
    }

    initial = { ...this.state }
    userInformation

    componentDidMount() {
        this.userInformation = JSON.parse(localStorage.getItem('user'));
        if (localStorage.getItem('user')) {
            console.log(this.userInformation)
        } else {
            this.setState({ ...this.initial })
        }
    }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }
    //Note-: Cannot understand why it is not storing it in the local storage. bowser used Mozilla

    checkValidation = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormFeilds = { ...this.state.formFields }
        const updatedFormElement = { ...updatedFormFeilds[inputIdentifier] }
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
        updatedFormFeilds[inputIdentifier] = updatedFormElement

        let formIsValid = true
        for (let inputIdentifiers in updatedFormFeilds) {
            formIsValid = updatedFormFeilds[inputIdentifiers].valid && formIsValid
        }
        this.setState({
            formFields: updatedFormFeilds,
            formIsValid: formIsValid
        })
    }


    onSumbitHandler = (event) => {
        event.preventDefault();
    /*

        Note-: Or by using axios we can send a post request such as-:

        axios.post('url of the posting end',this.state.formFields)
            .then(response=>{
                this.setState({...this.initial})
                this.props.history.push('/')
            })

    */
        console.log('Note-: Cannot understand why it is not storing it in the local storage.\nPlease visit the code of alternative which I have commented out')
        this.setState({ ...this.initial })
    }


    resetFormHandler = () => {
        this.setState({ ...this.initial })
    }


    render() {
        const formElementsArray = []
        for (let key in this.state.formFields) {
            formElementsArray.push({
                id: key,
                config: this.state.formFields[key]
            })
        }

        let form = (
            <form onSubmit={this.onSumbitHandler} className={classes.FormDesign}>
                <Typography align='center' variant='h3' color='secondary' gutterBottom>Information Form</Typography>
                {formElementsArray.map((formElement) => {
                    return (
                        <Input
                            key={formElement.id}
                            fielder={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            label={formElement.config.elementConfig.label}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation} />
                    )
                })}
                <div className={classes.ButtonGroup}>
                    <Button variant='outlined' color='secondary' onClick={this.resetFormHandler} style={{ marginRight: '10px' }} >RESET</Button>
                    <Button variant='outlined' color='primary' disabled={!this.state.formIsValid} type='submit' >SUBMIT</Button>
                </div>
            </form>
        )

        return (
            <div>
                <Grid container justify='center' alignItems='center' >
                    <Grid item xs={9} sm={6}>
                        {form}
                    </Grid>
                </Grid>
            </div>
        )
    }
}
