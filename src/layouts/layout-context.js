import React from 'react';

const { Provider, Consumer } = React.createContext(null);

const DEFAULT_LAYOUT_OPTIONS = {
  shouldHideHeader: false,
  shouldHideFooter: false,
};

// CONTEXT PROVIDER
export class LayoutContextProvider extends React.Component {
  state = DEFAULT_LAYOUT_OPTIONS;

  render() {
    const { setLayoutOptions } = this;
    const {
      shouldHideHeader,
      shouldHideFooter,
    } = this.state;
    const { children } = this.props;

    return (
      <Provider
        value={{
          layoutState: {
            shouldHideHeader,
            shouldHideFooter,
            setLayoutOptions,
          },
        }}
      >
        {children}
      </Provider>
    );
  }

  setLayoutOptions = (options) =>
    this.setState(options)
}

// CONTEXT INJECTION HOC
export const withLayoutContext = (
  Component
) => (props) => (
  <Consumer>
    {(context) => <Component {...Object.assign({}, props, context)} />}
  </Consumer>
);

// COMPONENT USED TO CHANGING LAYOUT OPTIONS
export const LayoutOptions = withLayoutContext(
  // tslint:disable-next-line:max-classes-per-file
  class extends React.Component {
    areOptionsSet = false;

    componentDidMount() {
      const { layoutState, ...props } = this.props;

      if (!this.areOptionsSet) {
        layoutState.setLayoutOptions(props);
        this.areOptionsSet = true;
      }
    }

    componentWillUnmount() {
      const { layoutState } = this.props;

      layoutState.setLayoutOptions(DEFAULT_LAYOUT_OPTIONS);
    }

    render() {
      return null;
    }
  },
);