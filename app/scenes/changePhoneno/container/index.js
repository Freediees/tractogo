import React, { useState, useEffect } from 'react'
// import { Platform, Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import I18n from 'react-native-i18n'

// import { liveInEurope } from 'App/Stores/Example/Selectors'
import PhoneNoChangeScreen from 'components/organism/phoneNoChangeScreen';
import putUpdatePhoneNo from '../store/actions';
import { localStorageDecrypt } from 'function/storage'

function ChangePhoneNo(props) {


    const [onLoad, setonLoad] = useState(false);

    useEffect(() => {

        // return console.log(props.profile)



    }, [!onLoad])


    const [phoneNumber, setPhoneNumber] = useState({
        id_code: '+62',
        phone: props.profile.NoHandphone
    })

    const onSave = async () => {
        let token = await localStorageDecrypt('token')

        let values = {
            NoHandphone: props.profile.NoHandphone,
            UpdateNoHandphone: phoneNumber.phone,
            token: token
        }
        props.putPhoneno(values)
        // if (props.loginSucces)
        //     props.navigation.replace('LoginVerification')
    }

    if (props.profile.NoHandphone)
        return <PhoneNoChangeScreen
            onBack={() => props.navigation.goBack()}
            phoneNumber={phoneNumber.phone}
            email={props.profile.user_login.EmailPersonal}
            onChangePhoneNumber={(a, b) => setPhoneNumber({
                id_code: a,
                phone: b
            })}
            onSubmit={onSave}
        />

    return null


}

const mapStateToProps = (state) => ({
    profile: state.profile.profileSuccess,
    phoneNoSucces: state.profile.phoneNoSucces,
    isLoading: state.profile.loading,
    phoneNoError: state.profile.phoneNoError,
    // liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
    putPhoneno: (value) => dispatch(putUpdatePhoneNo.putPhoneno(value)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePhoneNo)