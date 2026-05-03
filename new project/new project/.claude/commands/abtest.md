Scan the project root directory (the working directory, excluding hidden folders like `.claude`) for existing client folders. These are top-level directories that represent clients.

Then do the following:

1. Display a numbered list of existing clients found, followed by a "New Client" option. Example:

```
Existing clients:
1. Babylonstoren
2. New Client
```

2. Ask the user: "Pick a client (enter number) or choose New Client to add one:"

3. If the user picks an existing client, use that name. If they pick "New Client", ask: "Enter the new client name:"

4. Then ask: "Enter the test name (e.g. Recipe | Buy Box | PDP Buy Box Redesign | ALL | CRO-12051):"

5. Once you have both the client name and test name, create the AB test folder structure by following the rules in `.claude/rules/ab-test.md` exactly — including the correct folder layout, the full JS boilerplate with all helper functions, the scoped CSS with body.<variation_name>, and the config.json with empty urls array.
