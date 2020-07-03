import React from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { responsiveWidth as wp, responsiveHeight as hp } from 'react-native-responsive-dimensions'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Background, Fonts } from 'theme'
import { Colors } from 'react-native/Libraries/NewAppScreen'

//#region : static datasource
const slides = [
  {
    key: 1,
    title: 'Various add ons to keep you moving on',
    text: 'Customize your booking car based on your needs, we got them covered',
    image: require('images/1.png'),
    backgroundColor: '#59b2ab',
  },
  //   {
  //     key: 2,
  //     title: 'Track your drivers location anywhere',
  //     text:
  //       'Wherever and whenever you are ready, our driver always accessible through your phone to get you to your next destination!',
  //     image: require('images/2.png'),
  //     backgroundColor: '#febe29',
  //   },
  {
    key: 2,
    title: 'Various add ons to keep you moving on',
    text: 'Customize your booking car based on your needs, we got them covered',
    image: require('images/3.png'),
    backgroundColor: '#22bcb5',
  },
]

//#endregion

export default function WalktroughScreen({
  datasource,
  onSignUp,
  labelSignUp,
  onSignIn,
  labelSignin,
  onHome,
}) {
  const _renderPagination = (activeIndex) => {
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <View style={styles.paginationDots}>
              {datasource.length > 1 &&
                datasource.map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.dot,
                      i === activeIndex
                        ? { backgroundColor: 'white' }
                        : { backgroundColor: 'rgba(0, 0, 0, .2)' },
                    ]}
                    onPress={() => {
                      this.AppIntroSlider.goToSlide(i, true)
                    }}
                  />
                ))}
            </View>
            <TouchableOpacity
              onPress={onHome}
              style={{
                position: 'absolute',
                right: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...Fonts.f_14, ...Fonts.text_white }}>Skip</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    )
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <Image
          source={item.image}
          style={{ width: wp(100), height: hp(100), resizeMode: 'cover' }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 997,
            height: hp(42),
            padding: '5%',
          }}
        >
          <Text style={{ ...Fonts.f_20, color: Colors.white, paddingBottom: 20, width: '80%' }}>
            {item.title}
          </Text>
          <Text style={{ ...Fonts.f_12, color: Colors.white }}>{item.text}</Text>

          {item.key == slides.length ? (
            <View style={{ marginTop: 30 }}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={onHome}
                  style={{ ...styles.button, ...Background.bg_amber, ...styles.shadow }}
                >
                  <Text style={styles.buttonText}>{labelSignUp}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onSignIn} style={{ ...styles.button }}>
                  <Text style={styles.buttonText}>{labelSignin}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AppIntroSlider
        ref={(ref) => (this.AppIntroSlider = ref)}
        renderItem={_renderItem}
        data={datasource}
        //goToSlide={1}
        renderPagination={_renderPagination}
        onSignUp={onSignUp}
      />
    </View>
  )
}

WalktroughScreen.defaultProps = {
  datasource: slides,
  labelSignUp: 'Get Started',
  labelSignin: 'I Already Have an Account',
  onSignUp: () => {},
  onSignIn: () => {},
  onHome: () => {},
}

WalktroughScreen.propTypes = {
  datasource: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelSignUp: PropTypes.string,
  labelSignin: PropTypes.string,
  onSignUp: PropTypes.func,
  onSignIn: PropTypes.func,
  onHome: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    borderColor: '#FFF',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
})
