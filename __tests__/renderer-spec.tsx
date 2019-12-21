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

test('should render plain h1 with text', () => {
  expect((render(<h1>abcd</h1>) as string).trim()).toBe('# abcd');
});

test('should render plain h2 with text', () => {
  expect((render(<h2>abcd</h2>) as string).trim()).toBe('## abcd');
});

test('should render plain h3 with text', () => {
  expect((render(<h3>abcd</h3>) as string).trim()).toBe('### abcd');
});

test('should render plain h4 with text', () => {
  expect((render(<h4>abcd</h4>) as string).trim()).toBe('#### abcd');
});

test('should render plain h5 with text', () => {
  expect((render(<h5>abcd</h5>) as string).trim()).toBe('##### abcd');
});

test('should render plain strong with text', () => {
  expect((render(<strong>abcd</strong>) as string).trim()).toBe('**abcd**');
});

test('should render plain em with text', () => {
  expect((render(<em>abcd</em>) as string).trim()).toBe('_abcd_');
});

test('should render H1 with mixed strong and em text', () => {
  expect(
    (render(
      <h1>
        This is <strong>Hello</strong> <em>World</em>
      </h1>
    ) as string).trim()
  ).toBe('# This is **Hello** _World_');
});

test('should render plain unordered list with text', () => {
  expect(
    (render(
      <ul>
        <li>a</li>
        <li>b</li>
        <li>c</li>
      </ul>
    ) as string).trim()
  ).toBe('-   a\n-   b\n-   c');
});

test('should render plain ordered list with text', () => {
  expect(
    (render(
      <ol>
        <li>a</li>
        <li>b</li>
        <li>c</li>
      </ol>
    ) as string).trim()
  ).toBe('1.  a\n2.  b\n3.  c');
});
