import React from 'react';
import { Animated, Easing } from 'react-native';


export default class BaseComponent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.isMount;
        this.state = {
            active: false
        }

    }

    onStart = 0;
    mode = new Animated.Value(0);
    activated = new Animated.ValueXY({ x: 0, y: 0 });


    updateState(state, callback) {
        if (this.isMount)
            this.setState(state)

        if (callback != undefined)
            callback()
    }

    switchCheck() {

        Animated.sequence([
            Animated.timing(this.mode, {
                toValue: this.mode._value == 0 ? 1 : 0,
                duration: 200,
                bounciness: 20
            }),
            Animated.timing(this.activated, {
                toValue: this.mode._value == 0 ? 1 : 0,
                duration: 100,
                delay: 100,
                easing: Easing.linear
            }),

        ]).start(() => {
            let _switch = this.props.checked;
            _switch = this.mode._value === 0 ? false : true;

            this.updateState({ active: _switch }, () => {
                if (this.onStart)
                    this.props.onCheck(_switch)

                this.onStart++
            })

        });
    }

}