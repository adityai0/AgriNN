# Contributing to MorphoNN

Thank you for your interest in contributing to **MorphoNN**. We welcome contributors of all experience levels, including first-time open-source contributors.

## Welcome

- Be respectful and constructive in all discussions.
- Ask questions when something is unclear.
- Start small if you are new, such as documentation fixes or test improvements.

## How to Get Started

1. **Fork** the repository to your GitHub account.
2. **Clone** your fork locally:

```bash
git clone https://github.com/<your-username>/AgriNN.git
cd AgriNN
```

3. **Set up dependencies** for the components you plan to work on:

```bash
# Backend
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

4. **Create a branch** for your changes.

## Branch Naming Conventions

Use descriptive branch names:

- `feature/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`
- `test/<short-description>`

Examples:

- `feature/add-score-visualization`
- `fix/image-upload-timeout`
- `docs/update-readme-installation`

## Commit Message Guidelines

This project uses **Conventional Commits**.

Format:

```text
type(scope): short summary
```

Common types:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation change
- `refactor`: code restructuring without behavior change
- `test`: adding or updating tests
- `chore`: maintenance tasks

Examples:

- `feat(api): add endpoint for historical records`
- `fix(frontend): handle invalid image uploads`
- `docs(readme): clarify backend setup steps`

## Pull Request Guidelines

- Keep PRs focused and small when possible.
- Link related issues in the PR description (for example: `Closes #12`).
- Include a clear summary of what changed and why.
- Add screenshots or API examples if UI/API behavior changes.
- Ensure tests pass locally before opening a PR.
- Be responsive to review feedback and keep discussion constructive.

## Code Style Expectations

- Follow the existing project structure and naming patterns.
- Write clear, readable, and maintainable code.
- Add or update tests for new features and bug fixes.
- Keep functions/classes small and purposeful.
- Use meaningful variable and function names.
- Run formatting/linting tools before submitting.

## How to Report Bugs

When reporting a bug, please include:

- A clear, descriptive title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, browser, Python/Node versions)
- Screenshots/logs/error traces when possible

Open an issue in the repository and label it with `bug` if available.

## How to Suggest Features

Feature requests are welcome. Please include:

- The problem your idea solves
- Proposed solution
- Alternative solutions considered
- Potential impact or trade-offs

Open an issue in the repository and label it with `enhancement` if available.

## Need Help?

If you are unsure where to begin, open a discussion or issue and ask for a good first task. We are happy to help you get started.
