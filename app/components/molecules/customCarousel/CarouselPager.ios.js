/* eslint-disable react/no-string-refs */
/* eslint-disable react/prop-types */
var React = require('react')
var createReactClass = require('create-react-class')
var { ScrollView } = require('react-native')

var CarouselPager = createReactClass({
  scrollToPage(page, animated) {
    if (typeof animated === 'undefined') {
      animated = true
    }
    this.refs.scrollView.scrollTo({ x: page * this.props.width, y: 0, animated: animated })
  },

  _onMomentumScrollEnd(e) {
    var activePage = e.nativeEvent.contentOffset.x / this.props.width
    this.props.onEnd(activePage)
  },

  render() {
    return (
      <ScrollView
        ref="scrollView"
        contentContainerStyle={this.props.contentContainerStyle}
        automaticallyAdjustContentInsets={false}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScrollBeginDrag={this.props.onBegin}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        scrollsToTop={false}
      >
        {this.props.children}
      </ScrollView>
    )
  },
})

module.exports = CarouselPager
