import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Slugify text for heading IDs
 */
export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parse inline markdown elements:
 * - **bold**
 * - [text](url)
 * - `code`
 */
export function renderInline(text) {
  if (!text) return null;

  // Split tokens for bold, links, code
  // Regex to match **bold**, [link](url), `code`
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold: **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return <strong key={index} style={{ fontWeight: '700', color: '#1A202C' }}>{renderInline(content)}</strong>;
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith('/') || href.startsWith('#');
      if (isInternal) {
        return (
          <Link key={index} to={href} className="editorial-link">
            {label}
          </Link>
        );
      }
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link"
        >
          {label}
        </a>
      );
    }

    // Code: `code`
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="editorial-code">
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

/**
 * Extract Table of Contents items from raw markdown
 */
export function extractTocFromMarkdown(markdown) {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const toc = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const headingText = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '').trim();
      // Skip the H2 that says "SEO Settings" or purely administrative headers if any
      if (headingText.toLowerCase().includes('seo settings')) continue;
      const id = slugify(headingText);
      toc.push({ id, text: headingText, level: 2 });
    } else if (trimmed.startsWith('### ')) {
      const headingText = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '').trim();
      const id = slugify(headingText);
      toc.push({ id, text: headingText, level: 3 });
    }
  }

  return toc;
}

/**
 * ArticleMarkdownRenderer - Continuous Editorial Article Body
 */
export default function ArticleMarkdownRenderer({ markdown }) {
  if (!markdown) return null;

  const lines = markdown.split('\n');
  const elements = [];
  let currentList = [];
  let currentTable = null;
  let inCodeBlock = false;
  let codeBlockLines = [];
  let skipUntilHeading = false; // To skip markdown H1 since Page Hero already renders H1

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="editorial-list">
          {currentList.map((item, i) => (
            <li key={i} className="editorial-list-item">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushTable = () => {
    if (currentTable) {
      elements.push(
        <div key={`table-wrapper-${elements.length}`} className="editorial-table-wrapper">
          <table className="editorial-table">
            {currentTable.headers && (
              <thead>
                <tr>
                  {currentTable.headers.map((h, i) => (
                    <th key={i}>{renderInline(h)}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {currentTable.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Skip empty lines
    if (!trimmed) {
      flushList();
      flushTable();
      continue;
    }

    // Handle code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${elements.length}`} className="editorial-pre">
            <code>{codeBlockLines.join('\n')}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        flushList();
        flushTable();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // Skip top level H1 in markdown body (Hero Banner renders H1)
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      continue;
    }

    // Check for Table: starts with '|'
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());

      // If it's a delimiter row like | :--- | :--- |
      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        continue;
      }

      if (!currentTable) {
        currentTable = { headers: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    // Check for Horizontal Rule
    if (/^(\*\*\*|---|___)$/.test(trimmed)) {
      flushList();
      elements.push(<hr key={`hr-${elements.length}`} className="editorial-divider" />);
      continue;
    }

    // Check for Headings
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      flushList();
      const headingText = trimmed.replace(/^##\s+/, '').trim();
      const id = slugify(headingText.replace(/\*\*/g, ''));
      elements.push(
        <h2 key={`h2-${elements.length}`} id={id} className="editorial-h2">
          {renderInline(headingText)}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      const headingText = trimmed.replace(/^###\s+/, '').trim();
      const id = slugify(headingText.replace(/\*\*/g, ''));
      elements.push(
        <h3 key={`h3-${elements.length}`} id={id} className="editorial-h3">
          {renderInline(headingText)}
        </h3>
      );
      continue;
    }

    // Check for Unordered List Item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const itemText = trimmed.slice(2).trim();
      currentList.push(itemText);
      continue;
    }

    // Check for Ordered List Item
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch && !trimmed.startsWith('##')) {
      // If preceding line was not a heading, treat as ordered item or paragraph
      // Let's check if it's part of a list
      currentList.push(`${numMatch[1]}. ${numMatch[2]}`);
      continue;
    }

    // Regular Paragraph
    flushList();

    // Check if this paragraph is a "What to ask:" callout or "Editorial note:"
    const isCallout =
      trimmed.startsWith('**What to ask:**') ||
      trimmed.startsWith('**Editorial note:**') ||
      trimmed.startsWith('**A final reminder');

    elements.push(
      <p
        key={`p-${elements.length}`}
        className={`editorial-paragraph ${isCallout ? 'editorial-callout-text' : ''}`}
      >
        {renderInline(trimmed)}
      </p>
    );
  }

  flushList();
  flushTable();

  return <div className="editorial-content-stream">{elements}</div>;
}
