import * as React from 'react';
import { render } from '../src/renderer';

test('should render plain text', () => {
  expect((render('abcd') as string).trim()).toBe('abcd');
});

test('should render numbers as text', () => {
  expect((render(123) as string).trim()).toBe('123');
});

test('should render null and not fail for empty values', () => {
  expect(render(null)).toBe(null);
  expect(render(undefined)).toBe(null);
  expect(render([])).toBe(null);
});

test('should render plain text with simple Function Component', () => {
  function TestComponent() {
    return 'abcd';
  }

  // Note: Rendering string from function comp shows TS error (https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544). This is a workaround.
  expect(
    (render(
      React.createElement((TestComponent as unknown) as React.FunctionComponent)
    ) as string).trim()
  ).toBe('abcd');
});

test('should render plain text with simple Class Component', () => {
  class TestComponent extends React.Component {
    render() {
      return 'abcd';
    }
  }

  expect((render(<TestComponent />) as string).trim()).toBe('abcd');
});

test('should render plain H1 with text', () => {
  expect((render(<h1>abcd</h1>) as string).trim()).toBe('# abcd');
});
