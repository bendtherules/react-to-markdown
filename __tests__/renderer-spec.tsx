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

test('should render paragraph with plain text', () => {
  expect((render(<p>abcd</p>) as string).trim()).toBe('abcd');
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

test('should render plain h6 with text', () => {
  expect((render(<h6>abcd</h6>) as string).trim()).toBe('###### abcd');
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

test('should render image with alt text and title', () => {
  expect(
    (render(
      <img src="./test.jpg" title="some title" alt="some alt" />
    ) as string).trim()
  ).toBe('![some alt](./test.jpg "some title")');
});

test('should render image with only alt text', () => {
  expect(
    (render(<img src="./test.jpg" alt="some alt" />) as string).trim()
  ).toBe('![some alt](./test.jpg)');
});

test('should render image with only title', () => {
  expect(
    (render(<img src="./test.jpg" title="some title" />) as string).trim()
  ).toBe('![](./test.jpg "some title")');
});

test('should render image without attributes', () => {
  expect((render(<img src="./test.jpg" />) as string).trim()).toBe(
    '![](./test.jpg)'
  );
});

test('should render link with text and title', () => {
  expect(
    (render(
      <a href="./test" title="some title">
        some text
      </a>
    ) as string).trim()
  ).toBe('[some text](./test "some title")');
});

test('should render link with only text', () => {
  expect((render(<a href="./test">some text</a>) as string).trim()).toBe(
    '[some text](./test)'
  );
});

test('should render link with only title', () => {
  expect(
    (render(<a href="./test" title="some title" />) as string).trim()
  ).toBe('[](./test "some title")');
});

test('should render link without title and text', () => {
  expect((render(<a href="./test" />) as string).trim()).toBe('[](./test)');
});

test('should render blockquote with plain text', () => {
  expect((render(<blockquote>some text</blockquote>) as string).trim()).toBe(
    '> some text'
  );
});

test('should render blockquote with mixed text', () => {
  expect(
    (render(
      <blockquote>
        <p>This is <em>hello</em> <strong>world</strong></p>
      </blockquote>
    ) as string).trim()
  ).toBe('> This is _hello_ **world**');
});

test('should render code tag with text', () => {
  expect(
    (render(
      <code lang="js">const a = 1;</code>
    ) as string).trim()
  ).toBe('```js\nconst a = 1;\n```');
});

test('should render code tag without text', () => {
  expect(
    (render(
      <code lang="js"/>
    ) as string).trim()
  ).toBe('```js\n\n```');
});
