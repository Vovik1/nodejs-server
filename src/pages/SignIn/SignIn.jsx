import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BASE_URL } from '../../config';
import './SignIn.css';
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/auth";
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required'),
});


class SignIn extends Component {
    handleSignIn = async (value, formikActions) => {
        const { onSignIn, history } = this.props;
        const result = await onSignIn(value);
        if (!result) {
            history.push("/");
        }
        if (result || result.err) {
            formikActions.setErrors(result.err);

        }
    };

    render() {
        return (
            <div className="modalContentIn">
                <div className="headerPopIn">
                    <h4 className="logClassIn">Log In to Your StudyHard Account!</h4>
                </div>
                <hr />
                <div className="fieldsIn">
                    <a className="logText fieldsIn" href={`${BASE_URL}/api/facebook`}>
                        <Button className='buttonsSignIn'>
                            Continue with Facebook
                        </Button>
                    </a>
                    <a className="logText fieldsIn" href={`${BASE_URL}/api/google`}>
                        <Button className='buttonsSignIn'>
                            Continue with Google
                        </Button>
                    </a>
                    <a className="logText fieldsIn" href="#">
                        <Button className='buttonsSignIn'>
                            Continue with Apple
                        </Button>
                    </a>
                    <Formik validationSchema={validationSchema}
                        initialValues={{ email: "", password: "" }}
                        onSubmit={this.handleSignIn}>
                        {({ values, handleSubmit, handleChange, isSubmiting, isValid, errors, touched }) =>
                            <Form>
                                <div className="inpAreaIn">

                                    <Field type="email" name="email" className="textInp" placeholder="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />

                                    <Field type="password" name="password" placeholder="Password" className="textInp"
                                        value={values.password}
                                        onChange={handleChange}
                                        className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />

                                </div>

                                <div className="logBtnIn fieldsIn">

                                    {isSubmiting && 'Loading'}
                                    <Button className='buttonsSignIn' type="submit" disabled={isSubmiting || !isValid} onClick={handleSubmit}>Log In</Button>

                                </div>
                                <div className="changeAccIn">
                                    <p className="forgotPassword">or <a href="#">Forgot Password</a></p>
                                    <p className="newAcc">Don't have an account?<a href="#"> Sign Up</a></p>
                                </div>
                            </Form>
                        }
                    </Formik>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    loading: state.auth.loading
});

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (credential) => dispatch(signIn(credential))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
