import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    console.log('####: error', error.message);
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log('####: error', error);
    console.log('####: errorInfo', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h4>Ошибка. Повторите попытку позже.</h4>;
    }
    return this.props.children;
  }
}
