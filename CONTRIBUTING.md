# Contributing

Thanks for contributing to this project.

## Getting Started

1. Fork the repository or clone it if you already have access.
2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd backend
npm install
```

4. Create your local environment file:

```bash
cp backend/.env.example backend/.env
```

5. Update the values in `backend/.env` for your local setup.

## Running the Project

Frontend:

```bash
npm run dev
```

Backend:

```bash
cd backend
npm start
```

## Contribution Workflow

1. Create a new branch for your work.
2. Keep changes focused and small when possible.
3. Test your changes locally before opening a pull request.
4. Open a pull request with a short description of:
   - what changed
   - why it changed
   - how it was tested

## Branch Naming

Use simple branch names such as:

- `feature/add-password-search`
- `fix/backend-api-error`
- `docs/update-readme`

## Notes

- Do not commit `.env` files or secrets.
- Use `backend/.env.example` as the template for required environment variables.
- If you change setup steps, also update `README.md`.
