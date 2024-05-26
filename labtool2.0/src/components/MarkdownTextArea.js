import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Form, Icon, TextArea } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

import useLegacyState from '../hooks/legacyState'

// replace Form.TextArea with FormMarkdownTextArea
// only adds preview and info line, Markdown needs to be supported by code
// viewing the text outside the text area
export const FormMarkdownTextArea = props => {
  const { defaultValue, scalable } = props
  const state = useLegacyState({ previewOpen: false, textValue: defaultValue ? defaultValue : '', width: window.innerWidth })

  const handleClick = () => {
    state.previewOpen = !state.previewOpen
  }

  const handleChange = (e, data) => {
    state.textValue = data.value
  }

  const handlePreviewChange = () => {
    state.textValue = props.value
  }

  const getNonScalableRightPadding = () => (scalable ? null : '0')
  const getContainerWidth = () => (scalable ? null : '100%')

  const isWide = () => scalable && state.width >= 800

  const changeDirection = () => (isWide() ? 'row' : 'column')
  const getHorizontalMargin = () => (isWide() ? '0.5em' : 0)
  const getTextHeight = () => (isWide() ? '320px' : '160px')
  const getPreviewHeight = () => (isWide() ? '280px' : '200px')
  const getFlexPercentage = () => (isWide() ? '50%' : null)

  const onResize = () => {
    state.width = window.innerWidth
  }

  useEffect(() => {
    if (props.value || props.defaultValue) {
      state.textValue = props.value || props.defaultValue
    }
  }, [])

  useEffect(() => {
    handleChange(null, { value: props.value })
  }, [props.value])

  useEffect(() => {
    if (!scalable) {
      return
    }

    // make sure the width stays up to date by subscribing to resize events

    window.addEventListener('resize', onResize)
    document.documentElement.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      document.documentElement.removeEventListener('resize', onResize)
    }
  })

  const { previewOpen, textValue } = state

  return (
    <div style={{ width: getContainerWidth() }}>
      <p>
        <i>
          This field supports{' '}
          <a href="https://guides.github.com/features/mastering-markdown/" target="_blank" rel="noopener noreferrer">
            Markdown
          </a>
          .
        </i>
      </p>
      <div style={{ display: 'flex', flexDirection: changeDirection() }}>
        <Form.Field style={{ flex: getFlexPercentage(), marginRight: getHorizontalMargin(), paddingRight: getNonScalableRightPadding() }}>
          {/* resize: none -- we cannot allow resizing the area because the Markdown preview cannot resize with it */}
          <TextArea onInput={handleChange} {...props} scalable={null} style={{ height: getTextHeight(), marginBottom: '15px' }} />
        </Form.Field>
        <Accordion key fluid styled style={{ flex: getFlexPercentage(), textAlign: 'start', marginBottom: '2em', marginTop: 0, marginLeft: getHorizontalMargin() }}>
          <Accordion.Title
            active={isWide() || previewOpen}
            onClick={() => {
              handleClick()
              handlePreviewChange()
            }}
          >
            {!isWide() && <Icon name="dropdown" />}
            Preview Markdown
          </Accordion.Title>
          <Accordion.Content active={isWide() || previewOpen} style={{ overflowY: 'auto' }}>
            <ReactMarkdown source={textValue} />
          </Accordion.Content>
        </Accordion>
      </div>
    </div>
  )
}

FormMarkdownTextArea.propTypes = {
  value: PropTypes.any,
  defaultValue: PropTypes.string,
  scalable: PropTypes.bool
}
