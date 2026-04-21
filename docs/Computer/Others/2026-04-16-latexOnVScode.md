---
layout: post
title: Latex in VS Code
date: 2026-04-16
draft: false
categories:
  - Computer
tags:
  - Latex
  - Mathematics
---

# How to edit and compile $\LaTeX$ in `VS Code`

## $\LaTeX$ Workshop

$\LaTeX$ Workshop is a `VS Code` extension. See [here](https://github.com/James-Yu/LaTeX-Workshop){:target=" \_blank"} for details.

<!-- more -->

### Settings

Select the $\LaTeX$ Workshop extension, in it you can modify its specific settings by clicking the extension's icon <i class="fa-solid fa-gear"></i>.

You can also modify settings by directly editing `settings.json`. 

### Building the document

A $\LaTeX$ file is typically built by calling the command Build LaTeX project from the Command Palette or from the TeX badge. This command is bind to ++ctrl+alt+b++. The recipe called by this command is defined by [`latex-workshop.latex.recipe.default`](https://github.com/James-Yu/LaTeX-Workshop/wiki/Compile#latex-workshoplatexrecipedefault){:target=" \_blank"}.

If you have a multi-file project, see [`multi-files-projects`](https://github.com/James-Yu/LaTeX-Workshop/wiki/Compile#multi-file-projects){:target=" \_blank"} for more details on how the root file is discovered.

**Auto build LaTeX**

Besides manually calling the `Build LaTeX Project` command to compile a document, you may also let the extension automatically start compiling it upon file change or on save. This can be defined in [`latex-workshop.latex.autoBuild.run`](https://github.com/James-Yu/latex-workshop/wiki/Compile#auto-build-latex){:target=" \_blank"}. 

The recipe called by auto build is defined by [`latex-workshop.latex.recipe.default`](https://github.com/James-Yu/LaTeX-Workshop/wiki/Compile#latex-workshoplatexrecipedefault){:target=" \_blank"}.

**$\LaTeX$ recipes**

A $\LaTeX$ recipe refers to a sequence/array of commands which $\LaTeX$ Workshop executes sequentially when building $\LaTeX$ projects. It is defined by [`latex-workshop.latex.recipes`](https://github.com/James-Yu/latex-workshop/wiki/Compile#latex-recipes){:target=" \_blank"}. 

By default, $\LaTeX$ Workshop includes several basic recipes defined by the variables `latex-workshop.latex.recipes` and `latex-workshop.latex.tools`. Below are two popular examples:

- The first one simply relies on the `latexmk` command
- The second one run the following sequence of commands `pdflatex` → `bibtex` → `pdflatex` → `pdflatex`.

```json
"latex-workshop.latex.recipes": [
  {
    "name": "latexmk",
    "tools": [
      "latexmk"
    ]
  },
  {
    "name": "pdflatex -> bibtex -> pdflatex * 2",
    "tools": [
      "pdflatex",
      "bibtex",
      "pdflatex",
      "pdflatex"
    ]
  }
]
```

### Multi File projects

While it is fine to write all contents in one `.tex` file, it is common to split things up for simplicity. For such $\LaTeX$ projects, the file with `\documentclass[]{}` is considered as the root file, which serves as the entry point to the project. 

**The dependencies**

Once the root file is determined, it is parsed to discover all the files it includes using `input`, `include`, `InputIfFileExists`, `subfile`, `import` and `subimport` and the process goes on recursively. All these files are called dependencies and are considered to define a $\LaTeX$ project. If you include some files located in some external directories, you can list these extra directories in [`latex-workshop.latex.texDirs`](https://github.com/James-Yu/latex-workshop/wiki/Compile#latex-workshoplatextexdirs){:target=" \_blank"}. If you need to strip off some environments before actually parsing the file, use [`latex-workshop.latex.verbatimEnvs`](https://github.com/James-Yu/latex-workshop/wiki/Compile#latex-workshoplatexverbatimenvs){:target=" \_blank"}.

Moreover, when a `.fls` file with the same basename as the root file exists, it is used to compute the full list of dependencies, ie all classes, packages, fonts, input `.tex` files, listings, graphs, ... All these files are parsed to provide intellisense completion.

### Cleaning generated files

$\LaTeX$ compilation typically generates several auxiliary files. You can change default settings in [`latex-workshop.latex.autoClean.run`](https://github.com/James-Yu/latex-workshop/wiki/Compile#latex-workshoplatexautocleanrun){:target=" \_blank"} to define how autoClean would work:

- `never`: Disable the auto cleaning feature
- `onFailed`: Clean the project upon failed compilation.
- `onBuilt`: Clean the project upon completing a compilation, whether it is successful or not.

### Structure of the document

The structure of the $\LaTeX$ project (`\chapter`, `\section`, `\subsection`, ...) is accessible via the TeX panel on the left of the editor. The entry corresponding to the cursor position in the editor is automatically selected and follows the cursor. The outline hierarchy is defined by [`latex-workshop.view.outline.sections`](https://github.com/James-Yu/latex-workshop/wiki/ExtraFeatures#latex-workshopviewoutlinesections){:target=" \_blank"}.

### Counting words

To count the number of words in the current document, call Count words in $\LaTeX$ document from the Command Palette (the associated command is `latex-workshop.wordcount`). Setting [`latex-workshop.texcount.autorun`](https://github.com/James-Yu/latex-workshop/wiki/ExtraFeatures#latex-workshoptexcountautorun){:target=" \_blank"} to `onSave` counts the number of words on every file save and displays it in the status bar.

## $\LaTeX$ Style Files (`.sty`)

For detailed explanation, see [this post on Underleaf](https://www.underleaf.ai/learn/latex/style-files){:target=" \_blank"}.

A `.sty` file is a $\LaTeX$ style file, essentially a custom package. It lets you bundle commands, environments, and formatting rules into a single reusable file that you load with `\usepackage`. If you've ever had a preamble that spans 50+ lines of custom macros, a style file is how you clean it up.

### Creating Your First `.sty` File

A style file is a plain text file with a `.sty` extension. At minimum, it needs one line to identify itself. Create a file called `mycommands.sty` in the same directory as your `.tex` file:

```latex
% mycommands.sty
\NeedsTeXFormat{LaTeX2e}
\ProvidesPackage{mycommands}[2026/02/06 My custom commands]

% Load any packages your commands depend on
\RequirePackage{amsmath}
\RequirePackage{amssymb}
\RequirePackage{bm}

% --- Custom commands ---

% Probability and expectation
\newcommand{\E}{\mathbb{E}}
\newcommand{\Prob}{\mathbb{P}}
\newcommand{\Var}{\operatorname{Var}}

% Vector and matrix notation
\newcommand{\vv}[1]{\bm{#1}}            % bold vector
\newcommand{\mat}[1]{\bm{#1}}           % bold matrix
\newcommand{\tr}{\operatorname{tr}}      % trace

% Sets
\newcommand{\R}{\mathbb{R}}
\newcommand{\N}{\mathbb{N}}
\newcommand{\Z}{\mathbb{Z}}

% Norms and inner products
\newcommand{\norm}[1]{\left\lVert #1 \right\rVert}
\newcommand{\abs}[1]{\left\lvert #1 \right\rvert}
\newcommand{\inner}[2]{\left\langle #1, #2 \right\rangle}

\endinput
```

Then load it in your document:

```latex
\documentclass{article}
\usepackage{mycommands}  % loads mycommands.sty

\begin{document}
Let $\vv{x} \in \R^n$. Then $\E[\norm{\vv{x}}^2] = \tr(\mat{\Sigma})$.
\end{document}
```

### Anatomy of a `.sty` File

- **`\NeedsTeXFormat{LaTeX2e}`**: Declares that this package requires LaTeX2e (the current standard). Optional but good practice.
- **`\ProvidesPackage{name}[date description]`**: Identifies the package. The name must match the filename (without `.sty`). $\LaTeX$ uses this to prevent loading the same package twice.
- **`\RequirePackage{name}`**: The `.sty` equivalent of `\usepackage`. Use this instead of `\usepackage` inside style files to load dependencies.
- **`\newcommand, \renewcommand, \newenvironment`** Your custom definitions.
- **`\endinput`** Marks the end of the file. LaTeX stops reading here. Optional but recommended.

### `.sty` vs `.cls` Files

You may also encounter `.cls` files. The distinction is simple:

- **`.sty` (style file):** Loaded with `\usepackage`. Adds commands and features. You can load multiple .sty files.
- **`.cls` (class file):** Loaded with `\documentclass`. Defines the document type (article, book, etc.). You can only have one. Conference templates (like NeurIPS or ICML) typically provide a `.cls` file for the document layout and sometimes a `.sty` file for additional macros. Your own custom notation should go in a `.sty` file.

### Best Practices

- **Use `\newcommand` not `\def`:** \newcommand gives an error if the command already exists, preventing silent overwrites. \def silently replaces existing commands.
- **Prefix internal commands with `@`:** Commands like `\my@internal@helper` won't clash with user-level commands. The `@` character is not normally allowed in command names in `.tex` files, so this provides a natural namespace.
- **Use `\RequirePackage` instead of `\usepackage`:** They do the same thing, but `\RequirePackage` is the **convention** inside `.sty` files and works before `\documentclass`.
- **Keep one file per concern:** If your macros grow large, split into `math-notation.sty` and `formatting.sty` rather than one giant file.
- **Version your `.sty` files:** Include a date in the `\ProvidesPackage` line. Track changes in Git alongside your documents.

## Multi-file $\LaTeX$ projects

There are two main packages that allow compilation of single files in a multi-file project. The choice you make depends on what you need.

- With the `subfiles` package you can compile every subfile independently and each subfile will automatically use the preamble in the main file.
- With the `standalone` package every subfile works as an independent file, subfiles can be latter joined in a main document that will pull the preambles from each one of them. Especially useful if you need to reuse the same file in more than one document, a tikz picture is a good example of this.

### The main file

In the main file two special commands are needed.

```latex
\documentclass{article}
\usepackage{graphicx}
\graphicspath{{images/}}

\usepackage{blindtext}

\usepackage{subfiles} % Best loaded last in the preamble

\title{Subfiles package example}
\author{Overleaf}
\date{ }

\begin{document}

\maketitle

\section{Introduction}
\subfile{sections/introduction}
\section{Second section}
\subfile{sections/section2}

\end{document}
```

### The subfiles

Once you have set up your main file, each subfile must have a special structure. You can select any **subfile** to compile, provided it contains a `\documentclass` declaration.

```latex
\documentclass[../main.tex]{subfiles}

\graphicspath{{\subfix{../images/}}}

\begin{document}

\textbf{Hello world!}

\begin{figure}[bh]
\centering
\includegraphics[width=3cm]{overleaf-logo}
\label{fig:img1}
\caption{Overleaf logo}
\end{figure}

Hello, here is some text without a meaning...

\end{document}
```

The example has been successfully tested in `VS Code`.

## Glossaries in $\LaTeX$

Overleaf has [an article](https://www.overleaf.com/learn/latex/Glossaries#Compiling_the_glossary){:target=" \_blank"} explaining the use of `glossaries` package. 

Let's start with a simple example.

```latex
\documentclass{article}
\usepackage[utf8]{inputenc}

\usepackage{glossaries}
\makeglossaries

\newglossaryentry{latex}
{
    name=LaTex,
    description={Is a markup language specially suited 
    for scientific documents}
}

\newglossaryentry{maths}
{
    name=Mathematics,
    description={Mathematics is what mathematicians do}
}

\begin{document}

The \gls{latex} typesetting markup language is specially suitable 
for documents that include \gls{maths}. 

\clearpage

\printglossaries

\end{document}
```

Some annotations:

- To create a glossary the package glossaries has to be imported. This is accomplished by the line `\usepackage{glossaries}`
in the preamble. 
- The command `\makeglossaries` must be written before the first glossary entry.
- Each glossary entry is created by the command` \newglossaryentry` which takes two parameters, then each entry can be referenced later in the document by the command `\gls`. 
- The command `\printglossaries` is the one that will actually render the list of words and definitions typed in each entry, with the title "Glossary". In this case it's shown at the end of the document, but `\printglossaries` can be used in any other location.
- If you want to change the **default title** of the glossary for something else, this is straightforward, **two parameters** must be added when printing the glossary: `\printglossary[title=Special Terms, toctitle=List of terms]`.
- For the "glossary" (as that of a section name) to show up in the table of contents put `\usepackage[toc]{glossaries}` in the preamble of your document.


### `\makeglossaries` working in `VS Code`

Here's how to configure the $\LaTeX$ Workshop extension to include a build step for `\makeglossaries`: You must define a custom "recipe" and "tool" in your `settings.json` file to tell VS Code how to handle glossaries.

Add or modify the following sections:

```json
"latex-workshop.latex.tools": [
    {
        "name": "pdflatex",
        "command": "pdflatex",
        "args": ["-synctex=1", "-interaction=nonstopmode", "-file-line-error", "%DOC%"]
    },
    {
        "name": "makeglossaries",
        "command": "makeglossaries",
        "args": ["%DOCFILE%"]
    }
],
"latex-workshop.latex.recipes": [
    {
        "name": "pdflatex -> makeglossaries -> pdflatex (*2)",
        "tools": ["pdflatex", "makeglossaries", "pdflatex", "pdflatex"]
    }
]
```















