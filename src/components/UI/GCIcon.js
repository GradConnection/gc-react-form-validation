import React from 'react'

class GCIcon extends React.Component {
  renderIcon (kind) {
    const { mainFill, width, height, size, iconTitle } = this.props

    switch (kind) {
      default:
        return null
      case 'calendarIcon':
        return (
          <svg
            id='layer_calnedarIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 50 50'
            aria-labelledby={iconTitle}
          >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='calendarIcon'>
              <path d='M48.6,0H1.4C0.6,0,0,0.6,0,1.4v0.2v8.6v38.4C0,49.4,0.6,50,1.4,50h47.2c0.8,0,1.4-0.6,1.4-1.4V10.2V1.6V1.4 C50,0.6,49.4,0,48.6,0z M1.4,1.6h47.2v8.6H1.4V1.6z M48.6,48.6H1.4V11.6h47.2V48.6z M17.8,43.9h5.9h2.5h5.9h2.5h8.4v-8.3V33v-5.7 v-2.6v-8.3h-8.4h-2.5h-5.9h-2.5h-5.9h-2.5H6.9v8.3v2.6V33v2.6v8.3h8.4H17.8z M33.6,17.8h0.3h0.7h6.9v6.8h-6.9h-0.7h-0.3V17.8z M33.6,27.3v-0.7v-0.4h0.3h0.7h6.9v0.4v0.7V33h-6.9h-0.7h-0.3V27.3z M33.6,35.6v-0.7v-0.4h0.3h0.7h6.9v0.4v0.7v6.8h-6.9h-0.7h-0.3 V35.6z M25.2,17.8h0.3h0.7h5.9v6.8h-5.9h-0.7h-0.3C25.2,24.7,25.2,17.8,25.2,17.8z M25.2,27.3v-0.7v-0.4h0.3h0.7h5.9v0.4v0.7V33 h-5.9h-0.7h-0.3C25.2,33,25.2,27.3,25.2,27.3z M25.2,35.6v-0.7v-0.4h0.3h0.7h5.9v0.4v0.7v6.8h-5.9h-0.7h-0.3 C25.2,42.4,25.2,35.6,25.2,35.6z M16.8,17.8h0.3h0.7h5.9v6.8h-5.9h-1C16.8,24.7,16.8,17.8,16.8,17.8z M16.8,26.1h0.3h0.7h5.9v0.4 v0.7V33h-5.9h-0.7h-0.3V26.1z M16.8,35.6v-0.7v-0.4h0.3h0.7h5.9v0.4v0.7v6.8h-5.9h-0.7h-0.3V35.6z M8.4,17.8h6.9v6.8H8.4V17.8z M8.4,27.3v-0.7v-0.4h6.9V33H8.4V27.3z M8.4,35.6v-0.7v-0.4h6.9v0.4v0.7v6.8H8.4V35.6z' />
            </g>
          </svg>
        )
      case 'chevronIcon':
        return (
          <svg
            id='layer_chevronIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 50 50'
            aria-labelledby={iconTitle}
        >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='chevronIcon'>
              <path
                d='M13.385 50a.729.729 0 0 1-.515-1.244l23.408-23.41L12.176 1.245a.729.729 0 1 1 1.03-1.03L37.824 24.83a.729.729 0 0 1 0 1.031L13.9 49.786a.727.727 0 0 1-.515.214z'
            />
            </g>
          </svg>
        )
      case 'caretIcon':
        return (
          <svg
            id='layer_caretIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 50 50'
            aria-labelledby={iconTitle}
            >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='caretIcon'>
              <path
                d='M25,7.9l8.8,8.8l3.9-3.9L25,0L12.2,12.8l3.9,3.9L25,7.9z M25,42.1l-8.8-8.8l-3.9,3.9L25,50l12.8-12.8l-3.9-3.9 L25,42.1z' />
            </g>
          </svg>
        )
      case 'closeIcon':
        return (
          <svg
            id='layer_closeIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 50 50'
            aria-labelledby={iconTitle}
          >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='closeIcon'>
              <path d='M26.1,25L49.8,1.3c0.3-0.3,0.3-0.8,0-1.1s-0.8-0.3-1.1,0L25,23.9L1.3,0.2C1-0.1,0.5-0.1,0.2,0.2s-0.3,0.8,0,1.1L23.9,25 L0.2,48.7c-0.3,0.3-0.3,0.8,0,1.1C0.4,49.9,0.6,50,0.8,50s0.4-0.1,0.5-0.2L25,26.1l23.7,23.7c0.1,0.1,0.3,0.2,0.5,0.2 s0.4-0.1,0.5-0.2c0.3-0.3,0.3-0.8,0-1.1L26.1,25z' />
            </g>
          </svg>
        )
      case 'hideIcon':
        return (
          <svg
            id='layer_hideIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 50 50'
            aria-labelledby={iconTitle}
          >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='hideIcon'>
              <path
                fill={mainFill} d='M0.8,25.6c-0.1-0.2-0.2-0.4-0.1-0.6c0-0.2,0-0.4,0.1-0.6c0.4-0.6,9.8-13.9,24.2-13.9c3.3,0,6.4,0.7,9.1,1.8l-1.3,1.3 c-2.4-0.9-5-1.5-7.8-1.5C12.8,12.2,4.1,22.9,2.5,25c1,1.3,4.6,5.8,10,9l-1.2,1.2C4.9,31.3,1.1,25.9,0.8,25.6z M49.2,24.6 C49.2,24.6,49.2,24.6,49.2,24.6C49.2,24.6,49.2,24.6,49.2,24.6C49.2,24.5,49.2,24.5,49.2,24.6c-0.3-0.5-4.1-5.9-10.4-9.9L37.5,16 c5.3,3.2,8.9,7.6,9.9,9C45.7,27.4,37.1,37.8,25,37.8c-2.8,0-5.4-0.6-7.8-1.5l-1.3,1.3c2.7,1.1,5.8,1.8,9.1,1.8 c14.4,0,23.8-13.4,24.2-14c0,0,0,0,0,0c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0-0.1,0-0.2,0-0.2 C49.3,24.7,49.2,24.7,49.2,24.6z M25,33.9c-1.6,0-3-0.4-4.3-1.1L19.5,34c1.6,1,3.5,1.5,5.5,1.5c5.8,0,10.6-4.7,10.6-10.6 c0-2-0.6-3.9-1.5-5.5l-1.2,1.2c0.7,1.3,1.1,2.7,1.1,4.3C33.9,29.9,29.9,33.9,25,33.9z M29.3,17.2l1.2-1.2c-1.6-1-3.5-1.6-5.5-1.6 c-5.8,0-10.6,4.7-10.6,10.6c0,2,0.6,3.9,1.6,5.5l1.2-1.2c-0.7-1.3-1.1-2.7-1.1-4.3c0-4.9,4-8.9,8.9-8.9C26.6,16.1,28,16.5,29.3,17.2 z M18.6,24c0,0.4,0.4,0.8,0.8,0.8c0.4,0,0.8-0.4,0.8-0.8c0-2.2,1.8-4,4-4c0.4,0,0.8-0.4,0.8-0.8s-0.4-0.8-0.8-0.8 C21.1,18.5,18.6,21,18.6,24z M49.5,0.5c-0.2-0.2-0.4-0.2-0.6-0.2c-0.2,0-0.4,0.1-0.6,0.2L35.8,13.1l-1.3,1.3L31.8,17l-1.2,1.2 L18.1,30.7L17,31.8l-3.1,3l-1.2,1.2L0.5,48.4c-0.3,0.3-0.3,0.8,0,1.2c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.4-0.1,0.6-0.2l12.6-12.6 l1.3-1.3l2.6-2.7l1.2-1.2l12.5-12.5l1.2-1.2l3-3l1.2-1.2L49.5,1.6C49.8,1.3,49.8,0.8,49.5,0.5z'
                />
            </g>
          </svg>
        )
      case 'showIcon':
        return (
          <svg
            id='layer_showIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 50 50'
            aria-labelledby={iconTitle}
            >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='showIcon'>
              <path
                fill={mainFill} d='M49.9,25.3c0,0,0-0.1,0-0.1c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1c0-0.1,0-0.1-0.1-0.2c0,0,0,0,0,0 c-0.4-0.6-10-14.4-24.9-14.4c-14.8,0-24.5,13.7-24.9,14.3C0,24.6,0,24.8,0,25c0,0,0,0,0,0c0,0,0,0,0,0c0,0.2,0,0.4,0.1,0.5 c0.4,0.6,10,14.3,24.9,14.3c14.8,0,24.5-13.8,24.9-14.4c0,0,0,0,0,0C49.9,25.4,49.9,25.3,49.9,25.3z M25,38.2 c-12.6,0-21.5-11-23.2-13.2C3.5,22.8,12.4,11.8,25,11.8c12.4,0,21.3,10.8,23.1,13.2C46.3,27.4,37.4,38.2,25,38.2z M25,14.1 c-6,0-10.9,4.9-10.9,10.9S19,35.9,25,35.9S35.9,31,35.9,25S31,14.1,25,14.1z M25,34.2c-5.1,0-9.2-4.1-9.2-9.2s4.1-9.2,9.2-9.2 s9.2,4.1,9.2,9.2S30.1,34.2,25,34.2z M25,19.1c0,0.5-0.4,0.8-0.8,0.8c-2.3,0-4.1,1.8-4.1,4.1c0,0.5-0.4,0.8-0.8,0.8 c-0.5,0-0.8-0.4-0.8-0.8c0-3.2,2.6-5.8,5.8-5.8C24.6,18.3,25,18.6,25,19.1z'
                  />
            </g>
          </svg>
        )
      case 'cloudIcon':
        return (
          <svg
            id='layer_cloudIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 32 32'
            aria-labelledby={iconTitle}
          >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='cloudIcon'>
              <path
                fill={mainFill}
                d='M27.5,12.1c0-0.3,0-0.6,0-0.9c-0.3-2.9-2.9-5.1-5.8-4.8c-1,0.1-1.9,0.4-2.7,1c-1.5-1.7-3.7-2.7-6-2.8
		                  c-4.2,0-7.7,3.1-8.2,7.3c-2.2,0.6-3.8,2.7-3.8,5v0.2c0,3.1,2.5,5.5,5.5,5.5h2.8l-0.1-0.1l0,0l0,0c-0.5-0.5-0.9-1.2-1-1.9H6.5
		                  c-1.9,0-3.5-1.6-3.5-3.5c0-0.1,0-0.1,0-0.2v-0.1c0-1.6,1.3-3,2.9-3.2l0.8-0.1v-0.8C6.8,9.3,9.6,6.6,13,6.6c2,0,3.9,1.1,5,2.8
		                  l0.7,1.1l0.9-1c1.2-1.4,3.3-1.6,4.7-0.4c0.7,0.6,1.1,1.4,1.2,2.3c0,0.4,0,0.8-0.1,1.1l-0.3,1l1,0.2c1.7,0.3,2.9,1.7,2.9,3.4
	                    c0,1.9-1.6,3.5-3.5,3.5h0h-1.7c-0.2,0.7-0.5,1.3-1,1.8l-0.1,0l0,0.1l-0.1,0.1h2.8c3.1,0,5.6-2.5,5.6-5.5c0,0,0,0,0,0
		                  C31,14.9,29.6,12.9,27.5,12.1z'
              />
              <path
                fill={mainFill}
                d='M20.7,20.4c-0.2,0.1-0.4,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2l-2.7-2.7v8.4c0,0.4-0.4,0.8-0.8,0.8c-0.5,0-0.8-0.4-0.8-0.8
	                    v-8.4l-2.7,2.7c-0.2,0.1-0.4,0.2-0.6,0.2c-0.4,0-0.8-0.4-0.8-0.8c0-0.2,0.1-0.4,0.2-0.6l2.1-2.1l2-2c0.1-0.1,0.2-0.1,0.3-0.2
	                    c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0.1,0.3,0.2l4.1,4.1C21,19.6,21,20.1,20.7,20.4z'
              />
            </g>
          </svg>
        )
      case 'ZoomInIcon':
        return (
          <svg
            id='layer_zoomInIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 24 24'
            ariaLabelledby={iconTitle}
          >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='zoomInIcon'>
              <path
                fill={mainFill}
                d='M24,21.7l-5.2-5.2c3.4-4.7,2.3-11.2-2.3-14.5S5.3-0.4,1.9,4.2s-2.3,11.2,2.3,14.5c3.6,2.6,8.6,2.6,12.2,0l5.2,5.2L24,21.7
                    z M10.4,17.4c-3.9,0-7.1-3.2-7.1-7.1c0-3.9,3.2-7.1,7.1-7.1c3.9,0,7.1,3.2,7.1,7.1C17.4,14.3,14.3,17.4,10.4,17.4z'
              />
              <path
                fill={mainFill}
                d='M15.2,10.6c-0.1,0.5-0.6,0.9-1.2,0.9h-2.5v2.6c0,0.6-0.5,1.2-1.2,1.2c-0.5,0-0.9-0.3-1.1-0.7c-0.1-0.1-0.1-0.3-0.1-0.4
                    v-2.6H6.6c-0.6,0-1.1-0.4-1.2-0.9C5.3,10,5.7,9.4,6.3,9.2c0.1,0,0.2,0,0.3,0h2.6V6.6c0-0.1,0-0.3,0.1-0.4C9.3,6,9.5,5.8,9.7,5.6
                    c0.2-0.1,0.4-0.2,0.6-0.2h0.1h0.1c0.6,0.1,0.9,0.6,0.9,1.2v2.5h2.6c0.6,0,1.2,0.5,1.2,1.2C15.2,10.5,15.2,10.6,15.2,10.6z'
              />
            </g>
          </svg>
        )
      case 'ZoomOutIcon':
        return (
          <svg
            id='layer_zoomOutIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 24 24'
            ariaLabelledby={iconTitle}
          >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='zoomOutIcon'>
              <path
                fill={mainFill}
                d='M24,21.7l-5.2-5.2c3.4-4.7,2.3-11.2-2.3-14.5S5.3-0.4,1.9,4.2s-2.3,11.2,2.3,14.5c3.6,2.6,8.6,2.6,12.2,0l5.2,5.2L24,21.7
			              z M10.4,17.4c-3.9,0-7.1-3.2-7.1-7.1c0-3.9,3.2-7.1,7.1-7.1c3.9,0,7.1,3.2,7.1,7.1C17.4,14.3,14.3,17.4,10.4,17.4z'
              />
              <path
                fill={mainFill}
                d='M15.2,10.6c-0.1,0.5-0.6,0.9-1.2,0.9H6.6c-0.6,0-1.1-0.4-1.2-0.9C5.3,10,5.7,9.4,6.3,9.2c0.1,0,0.2,0,0.2,0h7.5
			              c0.6,0,1.2,0.5,1.2,1.2C15.2,10.5,15.2,10.6,15.2,10.6z'
              />
            </g>
          </svg>
        )
      case 'infoIcon':
        return (
          <svg
            id='layer_infoIcon'
            height={height || size}
            width={width || size}
            viewBox='0 0 50 50'
            aria-labelledby={iconTitle}
            className={this.props.extendedClassName}
          >
            <title id={iconTitle}>{iconTitle}</title>

            <g id='infoIcon'>
              <path
                fill={mainFill}
                d='M25,0C11.1929,0,0,11.1929,0,25s11.1929,25,25,25s25-11.1929,25-25S38.8071,0,25,0z M25,48.5
                C12.0421,48.5,1.5,37.9579,1.5,25S12.0421,1.5,25,1.5S48.5,12.0421,48.5,25S37.9579,48.5,25,48.5z M26.4139,17.5823v23.8932
                c0,0.7804-0.6328,1.4133-1.4139,1.4133s-1.4139-0.6329-1.4139-1.4133V17.5823c0-0.7805,0.6328-1.4133,1.4139-1.4133
                S26.4139,16.8018,26.4139,17.5823z M27.3176,9.7568c0,1.28-1.0376,2.3176-2.3176,2.3176s-2.3176-1.0377-2.3176-2.3176
                c0-1.28,1.0376-2.3177,2.3176-2.3177S27.3176,8.4768,27.3176,9.7568z'
              />
            </g>
          </svg>
        )
    }
  }

  render () {
    const { kind, extendedClassNames } = this.props
    return (
      <span className={extendedClassNames ? 'gc-icon ' + extendedClassNames : 'gc-icon'}>
        {this.renderIcon(kind)}
      </span>
    )
  }
}

export { GCIcon }
