# Headings — this is H1

Body text.

## H2

Body text.

### H3

Body text.

#### H4

Body text.

##### H5

Body text.

###### H6

Paragraph with **bold**, *italic*, ***bold italic***, ~~strikethrough~~, `inline code`, and <sub>subscript</sub> / <sup>superscript</sup>.  
Keyboard key example: <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd>.

## Lists

- Unordered item
  - Nested unordered item
    - Deep nested unordered item

1. Ordered item
2. Another ordered item
   1. Nested ordered item
   2. Another nested ordered item
      1. Deep nested ordered item
      2. Another deep nested ordered item

- [ ] Task list item
  - Nested unordered item
    1. Deep nested ordered item
  - [ ] Nested task list item

## Links

[Inline link](https://github.com)  
[Section link to H6 heading](#h6)  
Autolink: https://example.com

## Images

Vanilla image link:
![A lovely kitten](http://bit.ly/1RXe87U)

<div align="center">
<img src="http://bit.ly/1RXe87U" width="200">
<p>Or, a centred image with centred text and the image size reduced.</p>
</div>

## Blockquote

> Block quotes are written like so.
>
> > They can be nested and span multiple paragraphs.
> > If you like

## Code

Example of inline `code`

### Code block examples

```bash
# Code block with bash
brew install git
```

```js
// JavaScript code block
function hi() {
  console.log("Hello!");
}
```

```diff
- Deletion
+ Addition
! Warning
@@ Diff hunk header @@
# Comment
```

## Tables

### Vanilla

| Feature   | Supported |
| --------- | --------- |
| Lists     | ✅         |
| Tables    | ✅         |
| Task list | ✅         |

### Aligned

| Left     | Center   | Right    |
|:---------|:--------:|---------:|
| a        | b        | c        |
| d        | e        | f        |

## Footnotes

Here is a simple footnote. Zoom to the bottom to see the reference [^1].

A footnote can also have multiple lines [^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.

## Collapsible section

<details>
  <summary>Click to expand</summary>

Hidden text inside a collapsible section.

</details>

## HTML elements GitHub allows

<sub>Subscript text</sub> <sup>Superscript text</sup> <kbd>KBD Key</kbd> <b>Bold HTML</b> <i>Italic HTML</i>

<details><summary>HTML-only details</summary>More HTML content</details>

## Alerts 

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

## Math

Inline math: $E = mc^2$

Block math:

$$
a^2 + b^2 = c^2
$$

## Diff highlighting

```diff
+ Added line
- Removed line
```

## Mentions and references

Mention: @octocat
Issue referenced by number: #1
Pull request referenced by URL: https://github.com/wesbos/dad-jokes/pull/224

- When an issue or PR reference is featured within a list item the full title gets rendered: https://github.com/left-pad/left-pad/issues/30

## Emoji

:rocket: :tada:

## Mixed Markdown and HTML

A paragraph with <i>HTML inline</i> plus **Markdown bold**.

End of file.

# Horizontal Rule

---

# Line breaks

In a markdown file, this example 
won't span two lines (in a comment it will)

In a markdown file, this example\
Will span two lines

# Escaping some markdown elements

\*Asterisks wrapped around text\*  
\# Using a `#` character, but not a heading  
\> Using a `>` character, but not a blockquote  

# HTML Elements

<p>This is a raw HTML paragraph in Markdown. Below there is some commented-out text and hmtl line breaks.</p>

<!-- This comment won't render -->

</br>
</br>
</br>
